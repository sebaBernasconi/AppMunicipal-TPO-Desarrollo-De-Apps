import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function Header({color, title, style}) {
    return (
        <View style={[styles.container, {...style}, {backgroundColor: color}]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 30,
        fontFamily: "OpenSansBold"
    }
})
