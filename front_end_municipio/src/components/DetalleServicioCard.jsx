import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";

export default function DetalleServicioCard({servicio}) {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image style={styles.imagen} source={{uri: servicio.imagen}}/>
                <View style={styles.body}>
                    <StyledText size30 style={styles.nombre}>{servicio.nombre}</StyledText>
                    <StyledText size24 style={styles.tipo}>{servicio.tipo}</StyledText>
                    <StyledText size20>Precio: {servicio.precio}</StyledText>
                    <StyledText size16>{servicio.descripcion}</StyledText>
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
