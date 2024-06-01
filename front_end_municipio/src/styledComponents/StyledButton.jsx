import {Pressable, StyleSheet, Text} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function StyledButton({
    onPress, OpenSansBold, text, backgroundColor, no_margin_vertical, text_white, ...props
}) {
    const textStyles = [
        OpenSansBold && styles.OpenSansBold,
        text_white && styles.text_white,
    ]
    const buttonStyles = [
        no_margin_vertical && styles.no_margin_vertical
    ]
    return (
        <Pressable
            onPress={onPress}
            style={
            [   styles.generalButton,
                {backgroundColor: backgroundColor ? backgroundColor : colors.blue500},
                buttonStyles
            ]}
        >
            <Text style={[textStyles, styles.generalText, {...props}]}>{text}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    generalButton: {
        height: 50,
        marginVertical: 16,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    generalText: {
        fontSize: 20,
        fontFamily: "OpenSans"
    },
    OpenSansBold: {
        fontFamily: "OpenSansBold"
    },
    text_white: {
        color: "white"
    },
    no_margin_vertical: {
        marginVertical: 0
    }
})
