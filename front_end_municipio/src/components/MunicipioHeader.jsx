import {Image, StyleSheet, View} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";
import logo_municipio from "../../assets/images/logo_municipio_blanco.png";

export default function MunicipioHeader() {
    return (
        <View style={styles.container}>
            <Image source={logo_municipio} style={styles.image}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.blue300,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        height: 250
    },
    image: {
        width: 450,
        height: 450,
        resizeMode: "contain"
    }
})
