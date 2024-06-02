import {Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import {AntDesign} from "@expo/vector-icons";
import {colors} from "../global/colors";
import DetalleServicioCard from "../components/DetalleServicioCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";

export default function DetallesServicioScreen({route, navigation}) {
    const {servicio} = route.params;

    return (
        <>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={36} color="black"/>
                </Pressable>
            </View>
            <StyledScreenWrapper no_padding>
                <DetalleServicioCard servicio={servicio}/>
            </StyledScreenWrapper>
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: colors.blue300,
        justifyContent: "center",
        padding: 10
    }
})
