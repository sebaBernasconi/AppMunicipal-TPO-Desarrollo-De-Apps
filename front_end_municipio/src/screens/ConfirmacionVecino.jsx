import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";

export default function ConfirmacionVecino({navigation}) {
    return (
        <StyledScreenWrapper>
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>¡Cuenta Solicitada!</Text>
                    <Text style={styles.body}>Dentro de aproximadamente 3 a 5 días hábiles te estará llegando un mail con las instrucciones para terminar la creación de tu cuenta.</Text>
                    <Text style={styles.body_bold}>Si ya te llego el mail podes volver al login para iniciar sesion!</Text>
                </View>
            </View>
            <StyledButton text={"Iniciar Sesion"} onPress={() => navigation.navigate("CambiarPassword")} text_white/>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue200,
        borderRadius: 10,
        padding: 16,
        gap: 20,
        height: "70%"
    },
    title: {
        fontSize: 30,
        fontFamily: "OpenSans"
    },
    body: {
        fontSize: 20,
        fontFamily: "OpenSans"
    },
    body_bold: {
        fontSize: 20,
        fontFamily: "OpenSansBold",
    }
})
