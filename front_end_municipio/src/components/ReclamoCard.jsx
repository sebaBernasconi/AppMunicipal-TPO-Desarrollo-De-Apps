import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import Card from "../styledComponents/Card";
import {colors} from "../global/colors";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";

export default function ReclamoCard({reclamo, navigation}) {

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
        <View style={styles.inputContainer}>
            <StyledText size20 style={{...styles.label}}>Id: 123456</StyledText>
            <Card borderColor={colors.blue600} style={{padding: 20, flexDirection: "row"}}>
                <View style={{gap: 10, flex: 4}}>
                    <StyledText size30 style={{color: getColorEstado("Activo")}}>Activo</StyledText>
                    <StyledText size20>Cabildo y Juramento</StyledText>
                    <StyledText size16 numberOfLines={3}>Descripcion la cual se va a acortar si es que supera cierto limite de palabras asdasdasdasdasdasdas asd asd asdasd asdasd asd asd asd asd as dasd </StyledText>
                </View>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Pressable style={styles.arrowButton} onPress={() => navigation.navigate("DetalleReclamo", {reclamo})}>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                    </Pressable>
                </View>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
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
