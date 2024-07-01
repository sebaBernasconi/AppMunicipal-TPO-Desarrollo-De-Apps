import {Alert, StatusBar} from "react-native";
import React, {useEffect} from "react";
import AuthStack from "./AuthStack";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import {useDispatch, useSelector} from "react-redux";
import {navigationRef} from "./RootNavigation";
import {fetchSession, getReclamosGuardados} from "../db";
import {setUser} from "../features/auth/authSlice";
import {ipLocal} from "../global/ipLocal";
import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";

export default function MainNavigator() {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const session = await fetchSession();
                if (session?.rows.length) {
                    const dni = session.rows._array[0];
                    const jwt = session.rows._array[1];
                    dispatch(setUser(dni, jwt));
                }
            } catch (error) {
                console.log(error.message);
            }
        })();

    }, []);

    useEffect(() => {
        (async () => {
            const reclamos = await getReclamosGuardados()
            if (reclamos?.rows.length) {
                const networkStatus = await Network.getNetworkStateAsync()
                if (networkStatus.type !== Network.NetworkStateType.WIFI) {
                    return;
                }

                for (let i = 0; i < reclamos.rows.length; i++) {
                    const reclamo = reclamos.rows._array[i]
                    const sitio = {
                        latitud: reclamo.latitud,
                        longitud: reclamo.longitud,
                        calle: reclamo.calle,
                        nroCalle: reclamo.nroCalle,
                        entreCalleA: reclamo.entreCalleA,
                        entreCalleB: reclamo.entreCalleB,
                        descripcion: reclamo.descripcionSitio,
                        fechaApertura: reclamo.fechaApertura,
                        fechaCierre: reclamo.fechaCierre,
                        comentarios: reclamo.comentarios
                    }
                    const idVecino = reclamo.dni
                    const descripcion = reclamo.descripcion

                    const desperfecto = {idRubro: reclamo.idRubro, descripcion: reclamo.descripcionDesperfecto}

                    const reclamoDTO = {idVecino, sitio, desperfecto, descripcion}

                    const formData = new FormData();

                    formData.append("reclamoDTO", {"string": JSON.stringify(reclamoDTO), type: "application/json"});

                    const fileInfo = await FileSystem.getInfoAsync(reclamo.image);
                    const fileUri = fileInfo.uri;
                    const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);

                    formData.append("archivo", {
                        uri: fileUri,
                        name: fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.length),
                        type: `image/${fileType}`
                    });

                    try {
                        const response = await fetch(`http://${ipLocal}:8080/reclamos/registrar`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": `Bearer ${jwt}`
                            },
                            body: formData
                        })
                        if (!response.ok) {
                            throw new Error(await response.text())
                        }
                        const data = await response.json();
                        Alert.alert("Reclamo enviado", "El reclamo guardado localmente se ha enviado", [
                            {
                                text: "OK",
                            }
                        ])
                        console.log("RECLAMO GUARDADO")
                        console.log(data)
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        })();
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar/>
            {dni ? <TabNavigation/> : <AuthStack/>}
        </NavigationContainer>
    );
};

