import {Platform, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import Constants from "expo-constants";
import {colors} from "../global/colors";

export default function StyledScreenWrapper({children, align_center, no_padding_top, justify_center, pd_horizontal16, no_padding, style}) {
    const viewStyle = [
        styles.general,
        align_center && styles.align_center,
        justify_center && styles.justify_center,
        pd_horizontal16 && styles.pd_horizontal16,
        no_padding && styles.no_padding,
        no_padding_top && styles.no_padding_top
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
    pd_horizontal16: {
        paddingHorizontal: 16
    },
    no_padding: {
        paddingHorizontal: 0,
        paddingTop: 0
    },
    no_padding_top: {
        paddingTop: 0
    }
})
