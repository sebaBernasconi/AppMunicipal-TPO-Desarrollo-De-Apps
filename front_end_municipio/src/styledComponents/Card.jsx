import {StyleSheet, View} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function Card({children, borderColor, style}) {
    return (
        <View style={[styles.container, {borderColor: borderColor ? borderColor : colors.blue400}, {...style}]}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        elevation: 10,
        backgroundColor: colors.white,
        zIndex: -1,
    }
})
