import {StyleSheet, View} from 'react-native'
import React from 'react'
import {colors} from "../global/colors";

export default function Card({children, style}) {
    return (
        <View style={{...styles.container, ...style}}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginVertical: 16,
        borderColor: colors.blue400,
        borderWidth: 2,
        padding: 5,
        elevation: 10,
        backgroundColor: colors.white,
        zIndex: -1
    }
})
