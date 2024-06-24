import React, {useState} from 'react'
import InputForm from '../components/InputForm'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import StyledButton from "../styledComponents/StyledButton";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";
import * as ImagePicker from "expo-image-picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {ipLocal} from "../global/ipLocal";
import * as FileSystem from 'expo-file-system';
import {createSchema} from "../validations/createSchema";

export default function GenerarServicioScreen({navigation}) {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)

    const [nombre, setNombre] = useState("");
    const [errorNombre, setErrorNombre] = useState("");

    const [rubro, setRubro] = useState("");
    const [errorRubro, setErrorRubro] = useState("");

    const [descripcion, setDescripcion] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");

    const [promocion, setPromocion] = useState("");
    const [errorPromocion, setErrorPromocion] = useState("");

    // TODO chequear ubicacion en local
    const [ubicacion, setUbicacion] = useState("");
    const [errorUbicacion, setErrorUbicacion] = useState("");

    const [telefono, setTelefono] = useState("");
    const [errorTelefono, setErrorTelefono] = useState("");

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const [localCreado, setLocalCreado] = useState(false);

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

    async function crearLocal() {
        const formData = new FormData();
        const idRubro = parseInt(rubro);
        const idVecino = "12345679";
        const contacto = telefono;
        const local = {idVecino, idRubro, promocion, contacto, descripcion, nombre};

        formData.append("localDTO", {"string": JSON.stringify(local), type: "application/json"});

        if (image) {
            const fileInfo = await FileSystem.getInfoAsync(image);
            const fileUri = fileInfo.uri;
            const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);

            formData.append("archivo", {
                uri: fileUri,
                name: imageName,
                type: `image/${fileType}`, // Ensure the type is set correctly based on the file type
            });
        }
        try {
            const response = await fetch(`http://${ipLocal}:8080/servicios/agregar`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${jwt}`
                },
                body: formData
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const res = await response.json();
            setLocalCreado(true)
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = () => {
        try {
            // createSchema.validateSync({nombre, rubro, descripcion, promocion, ubicacion, telefono, precio});
            crearLocal()
            navigation.navigate("ServicioCofirmado")
        } catch (err) {
            switch (err.path) {
                case "nombre":
                    setErrorNombre(err.message);
                    break;
                case "rubro":
                    setErrorRubro(err.message);
                    break;
                case "descripcion":
                    setErrorDescripcion(err.message);
                    break;
                case "promocion":
                    setErrorPromocion(err.message);
                    break;
                case "ubicacion":
                    setErrorUbicacion(err.message);
                    break;
                case "telefono":
                    setErrorTelefono(err.message);
                    break;
                case "precio":
                    setErrorPrecio(err.message)
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            {!localCreado ? (
                <StyledScreenWrapper no_padding_top>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex: 1}}>
                            <InputForm
                                label={"Nombre"}
                                error={errorNombre}
                                onChange={setNombre}
                                placeholder={"Nombre del Servicio/Comercio"}
                                color={colors.green400}
                            />

                            <InputForm
                                label={"Rubro"}
                                error={errorRubro}
                                onChange={setRubro}
                                placeholder={"Id Rubro"}
                                color={colors.green400}
                            />

                            <InputForm
                                label={"Descripcion"}
                                error={errorDescripcion}
                                onChange={setDescripcion}
                                placeholder={"Contanos mas"}
                                height={150}
                                color={colors.green400}
                                multiline
                            />

                            <InputForm
                                label={"Promocion"}
                                error={errorPromocion}
                                onChange={setPromocion}
                                placeholder={"Contanos mas"}
                                height={120}
                                color={colors.green400}
                                multiline
                            />

                            <InputForm
                                label={"Ubicacion"}
                                error={errorUbicacion}
                                onChange={setUbicacion}
                                placeholder={"Calle y numero"}
                                color={colors.green400}
                            />

                            <InputForm
                                label={"Telefono"}
                                error={errorTelefono}
                                onChange={setTelefono}
                                placeholder={"Ingrese su nro. de telefono"}
                                color={colors.green400}
                            />

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

                        </View>
                        <View style={{flexDirection: 'row', gap: 10, alignItems: "center"}}>
                            <View style={{flex: 1}}>
                                <StyledButton
                                    text={"Cancelar"}
                                    no_margin_vertical
                                    onPress={() => navigation.goBack()}
                                    text_white
                                    backgroundColor={colors.grey400}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <StyledButton text={"Crear"} onPress={onSubmit} text_white
                                              backgroundColor={colors.green400}/>
                            </View>
                        </View>
                    </ScrollView>
                </StyledScreenWrapper>

            ) : (
                <StyledScreenWrapper align_center justify_center>
                    <StyledText size30 >Local creado exitosamente!</StyledText>
                    <StyledButton text={"Regresar"} backgroundColor={colors.green400} onPress={() => setLocalCreado(false)}/>
                </StyledScreenWrapper>
            )}
        </>
    )
}
const styles = StyleSheet.create({})
