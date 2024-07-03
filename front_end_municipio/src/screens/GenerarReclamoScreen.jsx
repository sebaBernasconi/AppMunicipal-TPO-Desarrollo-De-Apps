import {Alert, Image, Pressable, ScrollView, StyleSheet, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import InputForm from "../components/InputForm";
import React, {useEffect, useState} from "react";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import checkbox_checked from "../../assets/images/checkbox_checked.png";
import checkbox_not_checked from "../../assets/images/checkbox_not_checked.png";
import StyledText from "../styledComponents/StyledText";
import {useSelector} from "react-redux";
import {ipLocal} from "../global/ipLocal";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import * as Network from "expo-network";
import {guardarReclamo} from "../db";
import DropdownList from "../components/DropdownList";

export default function GenerarReclamoScreen({navigation}) {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)

    const [descripcion, setDescripcion] = useState("");
    const [descripcionSitio, setDescripcionSitio] = useState("");
    const [descripcionDesperfecto, setDescripcionDesperfecto] = useState("");
    const [calle, setCalle] = useState("");
    const [nroCalle, setNroCalle] = useState(0);
    const [entreCalleA, setEntreCalleA] = useState("");
    const [entreCalleB, setEntreCalleB] = useState("");
    const [fechaApertura, setFechaApertura] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [idRubro, setIdRubro] = useState(0);

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const [location, setLocation] = useState({latitude: "", longitude: ""});

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        async function getLocation() {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        }

        getLocation()
    }, []);

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
    };

    const pickImageAsync = async () => {
        const isPermissionOk = await verifyCameraPermissions();
        if (!isPermissionOk) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageName(result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1, result.assets[0].uri.length))
        }
    };

    const resetForm = () => {
        setDescripcion("");
        setDescripcionSitio("");
        setDescripcionDesperfecto("");
        setCalle("");
        setNroCalle("");
        setEntreCalleA("");
        setEntreCalleB("");
        setFechaApertura("");
        setFechaCierre("");
        setComentarios("");
        setIdRubro("");
        setImage(null);
        setImageName("");
        setLocation({latitude: "", longitude: ""});
        setChecked(false)
    };

    async function handleSubmit() {
        const network = Network.getNetworkStateAsync()
        const networkType = (await network).type
        if (networkType === Network.NetworkStateType.NONE) {
            Alert.alert("Sin conexion a internet", "No tienes conexion WIFI o celular. Deseas guardar el reclamo para ser mandado una vez se renaude la conexion?", [
                {
                    text: "NO",
                    onPress: () => navigation.goBack(),
                },
                {
                    text: "SI",
                    onPress: () => guardarReclamoBD(),
                }
            ])
            resetForm()
            return;
        }
        if (networkType === Network.NetworkStateType.CELLULAR) {
            Alert.alert("Estas usando datos", "Estas usando red celular. Deseas subir el reclamo con esta red? (Sino el reclamo se guardara para ser mandado una vez se renaude la conexion)", [
                {
                    text: "NO",
                    onPress: () => guardarReclamoBD()
                },
                {
                    text: "SI",
                    onPress: () => guardarReclamoNow()
                }
            ])
        }
        if (networkType === Network.NetworkStateType.WIFI) {
            guardarReclamoNow()
        }
    }

    async function guardarReclamoNow() {
        const sitio = {
            latitud: location.latitude,
            longitud: location.longitude,
            calle,
            nroCalle,
            entreCalleA,
            entreCalleB,
            descripcion: descripcionSitio,
            fechaApertura,
            fechaCierre,
            comentarios
        }

        const desperfecto = {idRubro, descripcion: descripcionDesperfecto}

        const reclamo = {idVecino: dni, sitio, desperfecto, descripcion}
        const formData = new FormData();

        formData.append("reclamoDTO", {"string": JSON.stringify(reclamo), type: "application/json"});

        if (image) {
            const fileInfo = await FileSystem.getInfoAsync(image);
            const fileUri = fileInfo.uri;
            const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);

            formData.append("archivo", {
                uri: fileUri,
                name: imageName,
                type: `image/${fileType}`
            });
        }

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
            resetForm()
            navigation.navigate("ReclamoConfirmado")
        } catch (error) {
            console.error(error)
        }
    }

    function guardarReclamoBD() {
        guardarReclamo({
            dni: dni,
            descripcion: descripcion,
            descripcionSitio: descripcionSitio,
            descripcionDesperfecto: descripcionDesperfecto,
            calle: calle,
            nroCalle: nroCalle,
            entreCalleA: entreCalleA,
            entreCalleB: entreCalleB,
            fechaApertura: fechaApertura,
            fechaCierre: fechaCierre,
            idRubro: idRubro,
            image: image,
            latitud: location.latitude,
            longitud: location.longitude,
            comentarios: comentarios
        })
        Alert.alert("Reclamo guardado", "El reclamo se ha guardado en la base de datos exitosamente", [
            {
                text: "OK",
                onPress: () => navigation.goBack(),
            }
        ]);
    }

    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView>
                <View style={{flex: 1}}>
                    <InputForm
                        label={"Descripcion"}
                        placeholder={"Descripcion del reclamo..."}
                        multiline
                        onChange={setDescripcion}
                        height={150}
                    />

                    <DropdownList idRubro={idRubro} setIdRubro={setIdRubro} borderColor={colors.blue400}/>

                    <InputForm
                        label={"Descripcion del desperfecto"}
                        placeholder={"Descripcion del desperfecto..."}
                        onChange={setDescripcionDesperfecto}
                    />

                    <InputForm
                        label={"Calle"}
                        placeholder={"Nombre de la calle..."}
                        onChange={setCalle}
                    />

                    <InputForm
                        label={"Nro Calle"}
                        placeholder={"Numero de la calle..."}
                        onChange={setNroCalle}
                    />

                    <InputForm
                        label={"Entre calle A"}
                        placeholder={"Calle A"}
                        onChange={setEntreCalleA}
                    />

                    <InputForm
                        label={"Entre calle B"}
                        placeholder={"Calle B"}
                        onChange={setEntreCalleB}
                    />

                    <InputForm
                        label={"Descripcion del sitio"}
                        placeholder={"Descripcion del sitio..."}
                        onChange={setDescripcionSitio}
                        multiline
                        height={150}
                    />

                    <InputForm
                        label={"Fecha Apertura"}
                        placeholder={"Fecha apertura del sitio (dejar en blanco si es via publica)"}
                        onChange={setFechaApertura}
                    />

                    <InputForm
                        label={"Fecha Cierre"}
                        placeholder={"Fecha cierre del sitio (dejar en blanco si es via publica)"}
                        onChange={setFechaCierre}
                    />

                    <InputForm
                        label={"Comentarios"}
                        placeholder={"Comentarios del sitio"}
                        onChange={setComentarios}
                    />

                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}
                               onPress={() => setChecked(!checked)}>
                        {checked ? (
                            <Image source={checkbox_checked} style={{height: 30, width: 30}}/>
                        ) : (
                            <Image source={checkbox_not_checked} style={{height: 30, width: 30}}/>
                        )}
                        <StyledText size16>Acepto terminos y condiciones</StyledText>
                    </Pressable>
                </View>

                {/*Manejo de imagenes*/}
                <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Pressable onPress={pickImageAsync} style={{flex: 1}}>
                        <MaterialCommunityIcons name="file-image-plus-outline" size={70} color="black"/>
                    </Pressable>
                    {image ? (
                        <View style={{flex: 3}}>
                            <StyledText size16>{imageName}</StyledText>
                        </View>
                    ) : null}
                </View>

                <View style={styles.botones}>
                    <View style={styles.botonCancelar}>
                        <StyledButton text={"Cancelar"} backgroundColor={colors.grey}
                                      onPress={() => navigation.goBack()}/>
                    </View>

                    <View style={styles.botonAceptar}>
                        <StyledButton text={"Reclamar"} backgroundColor={colors.blue400}
                                      onPress={() => handleSubmit()}/>
                    </View>
                </View>
            </ScrollView>
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    botones: {
        flexDirection: "row",
        gap: 10
    },
    botonCancelar: {
        flex: 1
    },
    botonAceptar: {
        flex: 1
    }
})