import {Platform, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import Constants from "expo-constants";
import {colors} from "../global/colors";

export default function StyledScreenWrapper({children, align_center, justify_center, pdHorizontal16, noPadding, style}) {
    const viewStyle = [
        styles.general,
        align_center && styles.align_center,
        justify_center && styles.justify_center,
        pdHorizontal16 && styles.pdHorizontal16,
        noPadding && styles.noPadding
    ]

    return (
        <SafeAreaView style={[viewStyle, {...style}]}>
            {children}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    general: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        paddingHorizontal: 10,
        backgroundColor: colors.white
    },
    align_center: {
        alignItems: "center"
    },
    justify_center: {
        justifyContent: "center"
    },
    pdHorizontal16: {
        paddingHorizontal: 16
    },
    noPadding: {
        paddingHorizontal: 0,
        paddingTop: 0
    }
})
