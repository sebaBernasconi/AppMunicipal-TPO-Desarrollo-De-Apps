import React, {useEffect} from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ReclamosStack from "./ReclamosStack";
import GenerarStack from "./GenerarStack";
import DenunciasStack from "./DenunciasStack";
import PerfilStack from "./PerfilStack";
import {Alert, StyleSheet, View} from "react-native";
import {AntDesign, Entypo, FontAwesome5, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {colors} from "../global/colors";
import {ipLocal} from "../global/ipLocal";
import {useDispatch, useSelector} from "react-redux";
import {setNotificarDenuncia, setNotificarReclamo} from "../features/auth/authSlice";
import {isExpired} from "react-jwt";
import {deleteDenuncias, deleteReclamos, getDenunciasGuardadas, getReclamosGuardados} from "../db";
import * as Network from "expo-network";
import * as FileSystem from "expo-file-system";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    const {dni, jwt, notificarReclamo, notificarDenuncia} = useSelector((state) => state.authReducer.value)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://${ipLocal}:8080/usuarios/get/${dni}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
                if (!response.ok) {
                    throw new Error(await response.text())
                }
                const user = await response.json();
                if (user.cambiosEnReclamos) {
                    dispatch(setNotificarReclamo(true))
                }

                if (user.cambiosEnDenuncias) {
                    dispatch(setNotificarDenuncia(true))
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (isExpired(jwt)) {
                return;
            }
            const denuncias = await getDenunciasGuardadas()
            if (denuncias?.rows.length) {
                const networkStatus = await Network.getNetworkStateAsync()
                if (networkStatus.type !== Network.NetworkStateType.WIFI) {
                    return;
                }

                for (let i = 0; i < denuncias.rows.length; i++) {
                    const denuncia = denuncias.rows._array[i]
                    console.log(denuncia)
                    const sitio = {
                        latitud: denuncia.latitud,
                        longitud: denuncia.longitud,
                        calle: denuncia.calle,
                        nroCalle: denuncia.nroCalle,
                        entreCalleA: denuncia.entreCalleA,
                        entreCalleB: denuncia.entreCalleB,
                        descripcion: denuncia.descripcionSitio,
                        fechaApertura: denuncia.fechaApertura,
                        fechaCierre: denuncia.fechaCierre,
                        comentarios: denuncia.comentarios
                    }
                    const idVecino = denuncia.dni
                    const descripcion = denuncia.descripcion

                    const denunciaDTO = {idVecino, sitio, descripcion}

                    const formData = new FormData();

                    formData.append("denunciaDTO", {"string": JSON.stringify(denunciaDTO), type: "application/json"})

                    const fileType = denuncia.image.substring(denuncia.image.lastIndexOf('.') + 1);

                    formData.append("archivo", {
                        uri: denuncia.image,
                        name: denuncia.image.substring(denuncia.image.lastIndexOf('/') + 1, denuncia.image.length),
                        type: `image/${fileType}`
                    });

                    try {
                        const response = await fetch(`http://${ipLocal}:8080/denuncias/agregar`, {
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
                        Alert.alert("Denuncia enviada", "La denuncia guardada localmente se ha enviado", [
                            {
                                text: "OK",
                                onPress: () => deleteDenuncias()
                            }
                        ])
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        })();

    }, []);

    useEffect(() => {
        (async () => {
            if (isExpired(jwt)) {
                return;
            }
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
                        Alert.alert("Reclamo enviado", "El reclamo guardado localmente se ha enviado", [
                            {
                                text: "OK",
                                onPress: () => deleteReclamos()
                            }
                        ])
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        })();
    }, []);


    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name={"HomeStack"}
                component={HomeStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <Entypo name="home" size={34} color={focused ? "black" : "grey"}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"ReclamosStack"}
                component={ReclamosStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                {notificarReclamo ? (
                                    <View>
                                        <FontAwesome5 name="clipboard" size={34} color={focused ? "black" : "grey"}/>
                                        <FontAwesome6 name="circle-exclamation" size={24} color="red"
                                                      style={{position: "absolute", top: -9, right: -14}}/>
                                    </View>
                                ) : (

                                    <FontAwesome5 name="clipboard" size={34} color={focused ? "black" : "grey"}/>
                                )}
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"GenerarStack"}
                component={GenerarStack}
                options={{
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Ionicons name="add-circle" size={60} color={colors.blue500}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"DenunciasStack"}
                component={DenunciasStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                {notificarDenuncia ? (
                                    <View>
                                        <AntDesign name="exception1" size={34} color={focused ? "black" : colors.grey}/>
                                        <FontAwesome6 name="circle-exclamation" size={24} color="red"
                                                      style={{position: "absolute", top: -9, right: -14}}/>
                                    </View>
                                ) : (
                                    <AntDesign name="exception1" size={34} color={focused ? "black" : colors.grey}/>
                                )}
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"PerfilStack"}
                component={PerfilStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <FontAwesome5 name="user-alt" size={34} color={focused ? "black" : "grey"}/>
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60
    }
})