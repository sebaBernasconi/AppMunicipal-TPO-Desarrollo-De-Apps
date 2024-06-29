import {Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import Card from "../styledComponents/Card";
import {colors} from "../global/colors";
import {MaterialIcons} from "@expo/vector-icons";

export default function DenunciaCard({denuncia, navigation}) {
    console.log(denuncia)
    const {idDenuncia, sitio, estado, descripcion} = denuncia

    function getColorEstado(estado) {
        switch (estado) {
            case "Activo":
                return colors.orange500
            case "Pendiente":
                return colors.grey
            case "Cerrado":
                return colors.red
        }
    }

    return (
        <View style={styles.inputContainer}>
            <StyledText size20 style={{...styles.label}}>Id: {idDenuncia}</StyledText>
            <Card borderColor={colors.orange500} style={{padding: 20, flexDirection: "row"}}>
                <View style={{gap: 10, flex: 4}}>
                    <StyledText size30 style={{color: getColorEstado(estado)}}>{estado}</StyledText>
                    <StyledText size20>{sitio.calle}</StyledText>
                    <StyledText size16 numberOfLines={3}>{descripcion}</StyledText>
                </View>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Pressable style={styles.arrowButton}
                               onPress={() => navigation.navigate("DetalleDenuncia", {denuncia})}>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="white"/>
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginVertical: 20
    },
    label: {
        position: "absolute",
        zIndex: 100,
        top: -16,
        left: 23,
        padding: 5,
        fontFamily: "OpenSans",
        backgroundColor: colors.white,
        color: colors.orange500
    },
    input: {
        padding: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "OpenSans"
    },
    arrowButton: {
        backgroundColor: colors.orange500,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    }
})
