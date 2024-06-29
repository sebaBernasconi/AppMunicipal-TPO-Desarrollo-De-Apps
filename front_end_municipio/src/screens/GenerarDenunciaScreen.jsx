import {Image, Pressable, ScrollView, StyleSheet, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import InputForm from "../components/InputForm";
import React, {useEffect, useState} from "react";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import StyledText from "../styledComponents/StyledText";
import checkbox_not_checked from "../../assets/images/checkbox_not_checked.png";
import checkbox_checked from "../../assets/images/checkbox_checked.png";
import {useSelector} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import {ipLocal} from "../global/ipLocal";

export default function GenerarDenunciaScreen({navigation}) {

    const {dni,jwt} = useSelector((state) => state.authReducer.value)

    const [descripcion, setDescripcion] = useState("");

    const [calle, setCalle] = useState("");
    const [nroCalle, setNroCalle] = useState("");
    const [entreCalleA, setEntreCalleA] = useState("");
    const [entreCalleB, setEntreCalleB] = useState("");
    const [descripcionSitio, setDescripcionSitio] = useState("");
    const [fechaApertura, setFechaApertura] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");
    const [comentarios, setComentarios] = useState("")

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("")

    const [location, setLocation] = useState({latitude:"", longitude:""})

    const [checked, setChecked] = useState(false);

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
            aspect: [9, 16],
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
        setCalle("");
        setNroCalle("");
        setEntreCalleA("");
        setEntreCalleB("");
        setDescripcionSitio("");
        setFechaApertura("");
        setFechaCierre("");
        setComentarios("");
        setImage(null);
        setImageName("");
        setLocation({ latitude: "", longitude: "" });
        setChecked(false)
    }
    useEffect(() => {
        async function getLocation() {
            const {status} = await Location.requestForegroundPermissionsAsync();
            console.log(status)
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
        console.log(location)
    }, []);

    async function handleSumbit(){
        const idVecino = dni

        const latitud = location.latitude
        const longitud = location.longitude

        const sitio = {latitud, longitud, calle,
            nroCalle,entreCalleA,entreCalleB,descripcion: descripcionSitio,
            fechaApertura,fechaCierre,comentarios}

        const denuncia = {idVecino,sitio,descripcion}
        const formData = new FormData();

        formData.append("denunciaDTO", {"String": JSON.stringify(denuncia), type:"application/json"})

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
            const response = await fetch(`http://${ipLocal}:8080/denuncias/agregar`,{
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Autorization": `Bearer ${jwt}`
                },
                body: formData
            })

            if (!response.ok){
                throw new Error(await response.text())
            }
            const data = await response.json();
            resetForm()
            navigation.navigate("DenunciaConfirmada")
            console.log(data)
        }catch (error){
            console.error(error)
        }
    }
    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <InputForm
                        label={"Descripcion"}
                        placeholder={"Descripcion de la denuncia..."}
                        multiline
                        onChange={setDescripcion}
                        color={colors.orange500}
                        height={150}
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
                        <StyledButton text={"cancelar"} backgroundColor={colors.grey}
                                      onPress={() => navigation.goBack()}/>
                    </View>

                    <View style={styles.botonAceptar}>
                        <StyledButton text={"Denunciar"} backgroundColor={colors.orange500} onPress={() => handleSumbit()}/>
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
        flex: 1,
    },
    square: {
        borderWidth: 1,
        width: 30,
        height: 30
    }
})