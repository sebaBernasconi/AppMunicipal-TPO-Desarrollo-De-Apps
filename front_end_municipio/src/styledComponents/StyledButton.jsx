import {Pressable, StyleSheet, Text} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function StyledButton({
    onPress, font_colored, OpenSansBold, text, text_white, ...props
}) {
    const textStyles = [
        OpenSansBold && styles.OpenSansBold,
        text_white && styles.text_white
    ]
    return (
        <Pressable onPress={onPress} style={[styles.generalButton]}>
            <Text style={[textStyles, styles.generalText, {...props}]}>{text}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    generalButton: {
        height: 50,
        marginVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colors.blue500,
    },
    generalText: {
        fontSize: 24,
        fontFamily: "OpenSans"
    },
    OpenSansBold: {
        fontFamily: "OpenSansBold"
    },
    text_white: {
        color: "white"
    }
})
