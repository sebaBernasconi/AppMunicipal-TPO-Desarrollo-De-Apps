import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";

export default function DetalleDenunciaScreen({route}) {
    const {denuncia} = route.params;
    const base64ImagePrefix = 'data:image/jpeg;base64,';

    console.log(denuncia)
    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <StyledText color={colors.orange500}>Id Denuncia</StyledText>
                    <StyledText size20>{denuncia.idDenuncia}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.orange500}>DNI</StyledText>
                    <StyledText size20>{denuncia.vecino.dni}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.orange500}>Descripcion</StyledText>
                    <StyledText size20>{denuncia.descripcion}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.orange500}>Estado</StyledText>
                    <StyledText size20>{denuncia.estado}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.orange500}>Ubicacion</StyledText>
                    <StyledText size20>Calle: {denuncia.sitio.calle}</StyledText>
                    <StyledText size20>Nro Calle: {denuncia.sitio.nroCalle}</StyledText>
                    <StyledText size20>Entre calle A: {denuncia.sitio.entreCalleA}</StyledText>
                    <StyledText size20>Entre calle B: {denuncia.sitio.entreCalleB}</StyledText>
                    <StyledText size20>Comentarios: {denuncia.sitio.comentarios}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.orange500}>Imagen</StyledText>
                    <Image style={styles.imagen} source={{uri: `${base64ImagePrefix}${denuncia.imagenDenuncia}`}}/>
                </View>
            </ScrollView>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    imagen: {
        width: "100%",
        height: 400,
        resizeMode: "contain"
    },
    container: {
        backgroundColor: colors.orange200,
        gap: 10,
        padding: 15,
        borderRadius: 15,
        margin: 10,
        elevation: 5
    }
})
