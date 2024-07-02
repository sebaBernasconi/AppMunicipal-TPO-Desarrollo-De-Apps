import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";

export default function DetalleReclamoScreen({route}) {
    const {reclamo} = route.params;
    const base64ImagePrefix = 'data:image/jpeg;base64,';
    console.log(reclamo)
    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Id Reclamo</StyledText>
                    <StyledText size20>{reclamo.idReclamo}</StyledText>
                </View>


                <View style={styles.container}>
                    <StyledText color={colors.blue600}>DNI</StyledText>
                    <StyledText size20>{reclamo.vecino.dni}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Descripcion</StyledText>
                    <StyledText size20>{reclamo.descripcion}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Estado</StyledText>
                    <StyledText size20>{reclamo.estado}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Desperfecto</StyledText>
                    <StyledText size20>{reclamo.desperfecto.descripcion}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Rubro</StyledText>
                    <StyledText size20>{reclamo.desperfecto.rubro.descripcion}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Ubicacion</StyledText>
                    <StyledText size20>Calle: {reclamo.sitio.calle}</StyledText>
                    <StyledText size20>Nro Calle: {reclamo.sitio.nroCalle}</StyledText>
                    <StyledText size20>Entre calle A: {reclamo.sitio.entreCalleA}</StyledText>
                    <StyledText size20>Entre calle B: {reclamo.sitio.entreCalleB}</StyledText>
                    <StyledText size20>Comentarios: {reclamo.sitio.comentarios}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Historial</StyledText>
                    <StyledText size20>{reclamo.movimientosDelReclamo}</StyledText>
                </View>

                <View style={styles.container}>
                    <StyledText color={colors.blue600}>Imagen</StyledText>
                    <Image style={styles.imagen} source={{uri: `${base64ImagePrefix}${reclamo.imagenReclamo}`}}/>
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
        backgroundColor: colors.blue200,
        gap: 10,
        padding: 15,
        borderRadius: 15,
        margin: 10,
        elevation: 5
    }
})
