import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function ServicioCard({nombre, tipo, imagen, id}) {

    return (
        <View style={styles.container}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.tipo}>{tipo}</Text>
            <Image style={styles.imagen} source={imagen} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.blue300,
        backgroundColor: colors.blue200,
        padding: 14,
        width: 170,
        height: 190,
        borderRadius: 15
    },
    nombre: {
        fontSize: 24,
        fontFamily: "OpenSans"
    },
    tipo: {
        fontSize: 20,
        fontFamily: "OpenSans"
    },
    imagen: {
        width: "100%",
        height: "50%",
        resizeMode: "contain"
    }
})
