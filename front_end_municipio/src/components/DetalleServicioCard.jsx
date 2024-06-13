import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";

export default function DetalleServicioCard({servicio}) {
    const base64ImagePrefix = 'data:image/jpeg;base64,';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image style={styles.imagen} source={{ uri: `${base64ImagePrefix}${servicio.imagenLocal}` }}/>
                <View style={styles.body}>
                    <StyledText size30 style={styles.nombre}>{servicio.nombre}</StyledText>
                    <StyledText size24 style={styles.tipo}>{servicio.rubro.descripcion}</StyledText>
                    <StyledText size24 style={styles.tipo}>Duenio: {servicio.vecino.nombre} {servicio.vecino.apellido}</StyledText>
                    <StyledText size16 style={styles.tipo}>Contacto: {servicio.contacto}</StyledText>
                    <StyledText size16>{servicio.descripcion}</StyledText>
                    <StyledText size16 dark_blue style={{marginVertical: 10}}>{servicio.promocion}</StyledText>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 16,
        flexGrow: 1,
    },
    card: {
        borderRadius: 15,
        borderColor: colors.blue300,
        borderWidth: 2,
        backgroundColor: colors.blue200,
        flex: 1,
        marginBottom: 20
    },
    body: {
        padding: 16,
    },
    imagen: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    nombre: {
        textAlign: "center"
    },
    tipo: {
        paddingVertical: 10
    }
})
