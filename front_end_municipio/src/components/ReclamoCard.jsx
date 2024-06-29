import {Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import Card from "../styledComponents/Card";
import {colors} from "../global/colors";
import {MaterialIcons} from "@expo/vector-icons";

export default function ReclamoCard({reclamo, navigation}) {

    console.log(reclamo)
    const {idReclamo, sitio, estado, descripcion} = {...reclamo}

    function getColorEstado(estado) {
        switch (estado) {
            case "Activo":
                return colors.blue600
            case "Pendiente":
                return colors.grey
            case "Cerrado":
                return colors.red
        }
    }

    return (
        <View style={styles.container}>
            <StyledText size20 style={{...styles.label}}>Id: {idReclamo}</StyledText>
            <Card borderColor={colors.blue600} style={{padding: 20, flexDirection: "row"}}>
                <View style={{gap: 10, flex: 4}}>
                    <StyledText size30 style={{color: getColorEstado(estado)}}>{estado}</StyledText>
                    <StyledText size20>{sitio.calle}</StyledText>
                    <StyledText size16 numberOfLines={3}>{descripcion}</StyledText>
                </View>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Pressable style={styles.arrowButton}
                               onPress={() => navigation.navigate("DetalleReclamo", {reclamo})}>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="white"/>
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
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
        color: colors.blue600
    },
    input: {
        padding: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "OpenSans"
    },
    arrowButton: {
        backgroundColor: colors.blue600,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    }
})
