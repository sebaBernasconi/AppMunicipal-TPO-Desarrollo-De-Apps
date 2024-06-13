import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function ServicioCard({servicio, navigation, index}) {
    const base64ImagePrefix = 'data:image/jpeg;base64,';

    return (
        <Pressable
            style={[styles.container, {marginRight: index % 2 === 0 ? 20 : 0}]}
            onPress={() => navigation.navigate("DetallesServicio", {servicio})}
        >
            <View style={{flex: 1}}>
                <Text style={styles.nombre} numberOfLines={2}>{servicio.nombre}</Text>
                <Text style={styles.tipo} numberOfLines={1}>{servicio.rubro.descripcion}</Text>
            </View>
            <Image style={styles.imagen} source={{uri: `${base64ImagePrefix}${servicio.imagenLocal}`}}/>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.blue400,
        backgroundColor: colors.blue200,
        padding: 14,
        width: 170,
        height: 240,
        borderRadius: 15,
        marginBottom: 20,
    },
    nombre: {
        fontSize: 24,
        fontFamily: "OpenSans"
    },
    tipo: {
        fontSize: 20,
        fontFamily: "OpenSans",
        marginBottom: 10
    },
    imagen: {
        width: "100%",
        height: 100,
        resizeMode: "cover"
    }
})
