import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import InputForm from "../components/InputForm";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import Card from "../styledComponents/Card";

export default function PerfilScreen({navigation}) {
    return (
        <StyledScreenWrapper>
            <View style={styles.nombre}>
                <Image source={{uri:'https://img.freepik.com/foto-gratis/retrato-hombre-pasandolo-muy-bien_23-2149443790.jpg'}}
                    style={styles.imagen}/>
                <StyledText style={styles.nombrePerfil}>Franco Calles</StyledText>

            </View>



            <View style={styles.contenedor}>

                <StyledText>Mail</StyledText>

                <Card style={styles.contenedor}>
                    <Text style={styles.textoCard}>fcalles@gmail.com</Text>
                </Card>
            </View>

            <View>

                <StyledText>Direccion</StyledText>

                <Card style={styles.contenedor}>
                    <Text style={styles.textoCard}>Lima343</Text>
                </Card>
            </View>

            <View style={styles.boton}>
                <StyledButton text={"Cambiar Contrasña"}  />
            </View>

        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        marginVertical: 25
    },
    textoCard: {
        padding: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "OpenSans"
    },
    imagen:{
        width: 80,
        height: 80,
        borderRadius:150
    },
    nombre:{
        flexDirection: "row",
        paddingTop:30
    },
    nombrePerfil:{
        paddingLeft: 20
    },
    boton: {
        paddingTop:150
    }

})
