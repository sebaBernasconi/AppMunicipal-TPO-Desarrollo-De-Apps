import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import StyledButton from "../styledComponents/StyledButton";
import Card from "../styledComponents/Card";
import {colors} from "../global/colors";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/auth/authSlice";
import {deleteSession} from "../db";

export default function PerfilScreen({navigation}) {
    const {dni} = useSelector((state) => state.authReducer.value)
    const dispatch = useDispatch();

    async function onLogout() {
        dispatch(logout());
        await deleteSession({dni});
    }

    return (
        <StyledScreenWrapper no_padding_top>
            <View style={{flex: 1}}>
                <View style={styles.nombre}>
                    <Image
                        source={{uri: 'https://img.freepik.com/foto-gratis/retrato-hombre-pasandolo-muy-bien_23-2149443790.jpg'}}
                        style={styles.imagen}/>
                    <StyledText style={styles.nombrePerfil}>Franco Calles</StyledText>
                </View>

                <View style={styles.contenedor}>
                    <StyledText>Mail</StyledText>
                    <Card style={styles.contenedor}>
                        <StyledText size20 style={{paddingHorizontal: 10, padding: 5}}>fcalles@gmail.com</StyledText>
                    </Card>
                </View>

                <View>
                    <StyledText>Direccion</StyledText>
                    <Card style={styles.contenedor}>
                        <StyledText size20 style={{paddingHorizontal: 10, padding: 5}}>Lima 343</StyledText>
                    </Card>
                </View>
            </View>

            <StyledButton text={"Cerrar sesion"} text_white backgroundColor={colors.grey400} onPress={() => onLogout()}/>
            <StyledButton text={"Cambiar Contraseña"} text_white/>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        marginVertical: 20
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
    }
})
