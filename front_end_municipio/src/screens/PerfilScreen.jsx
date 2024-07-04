import {Image, StyleSheet, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import StyledButton from "../styledComponents/StyledButton";
import Card from "../styledComponents/Card";
import {colors} from "../global/colors";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/auth/authSlice";
import {deleteSession} from "../db";
import {ipLocal} from "../global/ipLocal";
import profile_icon from "../../assets/images/profile_icon_placeholder.png"
import * as ImagePicker from "expo-image-picker";
import {useFocusEffect} from "@react-navigation/native";
import {decodeToken} from "react-jwt";

export default function PerfilScreen({navigation}) {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)
    const dispatch = useDispatch();
    const base64ImagePrefix = 'data:image/jpeg;base64,';

    const [dataVecino, setDataVecino] = useState({nombre: "", apellido: "", barrio: {}, direccion: ""})
    const [dataUser, setDataUser] = useState({email: "", imagenPerfil: ""})
    const [dataInspector, setDataInspector] = useState({})

    const decodedToken = decodeToken(jwt)

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
    };

    const pickImageAsync = async () => {
        try {
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
                const formData = new FormData();

                const fileType = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('.') + 1);

                formData.append("archivo", {
                    uri: result.assets[0].uri,
                    name: result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1, result.assets[0].uri.length),
                    type: `image/${fileType}`
                })
                const response = await fetch(`http://${ipLocal}:8080/usuarios/subirImagenPerfil/${dni}`, {
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
            }
        } catch (error) {
            console.error(error)
        }
    };

    async function onLogout() {
        dispatch(logout());
        await deleteSession({dni});
    }

    async function getDataVecino() {
        try {
            const vecinoResponse = await fetch(`http://${ipLocal}:8080/vecinos/get/${dni}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (!vecinoResponse.ok) {
                throw new Error(await vecinoResponse.text())
            }
            const vecinoData = await vecinoResponse.json()
            setDataVecino(vecinoData)
        } catch (error) {
            console.error(error)
        }
    }

    async function getDataUsuario() {
        try {
            const userResponse = await fetch(`http://${ipLocal}:8080/usuarios/get/${dni}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (!userResponse.ok) {
                throw new Error(await userResponse.text())
            }
            const userData = await userResponse.json()
            setDataUser(userData)
        } catch (error) {
            console.error(error)

        }
    }

    async function getDataInspector() {
        try {
            const response = await fetch(`http://${ipLocal}:8080/personalMunicipal/buscar/${dni}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (!response.ok) {
                throw new Error((await response).text())
            }
            const data = await response.json()
            setDataInspector(data)
        } catch (err) {
            console.error(err)
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (decodedToken.rol === "vecino") {
                getDataVecino()
                getDataUsuario()
            }
            else if (decodedToken.rol === "inspector") {
                getDataUsuario()
                getDataInspector()
            }
        }, [])
    )

    if (decodedToken.rol === "inspector") {
        return (
            <StyledScreenWrapper no_padding_top>
                <View style={{flex: 1}}>
                    <View style={styles.nombre}>
                        {dataUser.imagenPerfil ? (
                            <Image style={styles.imagen}
                                   source={{uri: `${base64ImagePrefix}${dataUser.imagenPerfil}`}}/>
                        ) : (
                            <Image source={profile_icon} style={styles.profileIcon}/>
                        )}
                        <StyledText style={styles.nombrePerfil}>{dataInspector.nombre} {dataInspector.apellido}</StyledText>
                    </View>

                    <View style={styles.contenedor}>
                        <StyledText>Mail</StyledText>
                        <Card style={styles.contenedor}>
                            <StyledText size20 style={{paddingHorizontal: 10, padding: 5}}>{dataUser.email}</StyledText>
                        </Card>
                    </View>

                    <View>
                        <StyledText>Legajo</StyledText>
                        <Card style={styles.contenedor}>
                            <StyledText size20
                                        style={{paddingHorizontal: 10, padding: 5}}>{dataInspector.legajo}</StyledText>
                        </Card>
                    </View>

                    <View>
                        <StyledText>Sector</StyledText>
                        <Card style={styles.contenedor}>
                            <StyledText size20 style={{paddingHorizontal: 10, padding: 5}}>{dataInspector.sector}</StyledText>
                        </Card>
                    </View>

                </View>

                <StyledButton text={"Cambiar foto perfil"} text_white onPress={pickImageAsync}/>
                <StyledButton text={"Cerrar sesion"} text_white backgroundColor={colors.grey400}
                              onPress={() => onLogout()}/>
            </StyledScreenWrapper>
        )
    }
    return (
        <StyledScreenWrapper no_padding_top>
            <View style={{flex: 1}}>
                <View style={styles.nombre}>
                    {dataUser.imagenPerfil ? (
                        <Image style={styles.imagen}
                               source={{uri: `${base64ImagePrefix}${dataUser.imagenPerfil}`}}/>
                    ) : (
                        <Image source={profile_icon} style={styles.profileIcon}/>
                    )}
                    <StyledText style={styles.nombrePerfil}>{dataVecino.nombre} {dataVecino.apellido}</StyledText>
                </View>

                <View style={styles.contenedor}>
                    <StyledText>Mail</StyledText>
                    <Card style={styles.contenedor}>
                        <StyledText size20 style={{paddingHorizontal: 10, padding: 5}}>{dataUser.email}</StyledText>
                    </Card>
                </View>

                <View>
                    <StyledText>Direccion</StyledText>
                    <Card style={styles.contenedor}>
                        <StyledText size20
                                    style={{paddingHorizontal: 10, padding: 5}}>{dataVecino.direccion}</StyledText>
                    </Card>
                </View>

                <View>
                    <StyledText>Barrio</StyledText>
                    <Card style={styles.contenedor}>
                        <StyledText size20
                                    style={{paddingHorizontal: 10, padding: 5}}>{dataVecino.barrio.nombre}</StyledText>
                    </Card>
                </View>

            </View>

            <StyledButton text={"Cambiar foto perfil"} text_white onPress={pickImageAsync}/>
            <StyledButton text={"Cerrar sesion"} text_white backgroundColor={colors.grey400}
                          onPress={() => onLogout()}/>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        marginVertical: 10
    },
    imagen: {
        width: 80,
        height: 80,
        borderRadius: 1000
    },
    nombre: {
        flexDirection: "row",
        paddingTop: 30,
    },
    nombrePerfil: {
        paddingLeft: 20,
        paddingTop: 10,
    },
    profileIcon: {
        width: 80,
        height: 80
    }
})
