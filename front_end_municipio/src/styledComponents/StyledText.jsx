import {StyleSheet, Text} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function StyledText({
    children, letters_spaced, light_blue, dark_blue, bold, capitalized, size16, size20, size30, size36, numberOfLines, color, style}) {
    const textStyle = [
        styles.general,
        letters_spaced && styles.letters_spaced,
        capitalized && styles.capitalized,
        light_blue && styles.light_blue,
        dark_blue && styles.dark_blue,
        bold && styles.bold,
        size16 && styles.size16,
        size20 && styles.size20,
        size30 && styles.size30,
        size36 && styles.size36,
    ]

    return (
        <Text numberOfLines={numberOfLines} style={[textStyle, {...style}, {color: color ? color : "black"}]}>{children}</Text>
    )
}
const styles = StyleSheet.create({
    general: {
        fontSize: 24,
        fontFamily: "OpenSans",
    },
    bold: {
        fontFamily: "OpenSansBold"
    },
    letters_spaced: {
        letterSpacing: 2
    },
    capitalized: {
        textTransform: "capitalize"
    },
    light_blue: {
        color: colors.blue300
    },
    dark_blue: {
        color: colors.blue600
    },
    size16: {
        fontSize: 16
    },
    size20: {
        fontSize: 20
    },
    size30: {
        fontSize: 30
    },
    size36: {
        fontSize: 36
    }
})
