import {Image, StyleSheet, View} from 'react-native'
import React, {useEffect} from 'react'
import {colors} from "../global/colors";
import logo_municipio from "../../assets/images/logo_municipio_blanco.png";
import Animated, {ReduceMotion, Easing, useSharedValue, withTiming} from "react-native-reanimated";

export default function MunicipioHeader() {
    const headerHeight = useSharedValue(220);

    useEffect(() => {
        setTimeout(() => {
            headerHeight.value = withTiming(headerHeight.value / 2.2, {
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                reduceMotion: ReduceMotion.System,
            })
        }, 2000)
    }, []);

    return (
        <Animated.View style={[styles.container, {height: headerHeight}]}>
            <Image source={logo_municipio} style={styles.image}/>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.blue300,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        paddingTop: 10
    },
    image: {
        width: "150%",
        height: "150%",
        resizeMode: "contain"
    }
})
