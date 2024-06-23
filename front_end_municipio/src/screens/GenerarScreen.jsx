import {Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {colors} from "../global/colors";
import * as RootNaigation from "../navigation/RootNavigation";


export default function GenerarScreen({navigation}) {
    return (
        <StyledScreenWrapper pd_horizontal16>
            <View style={styles.fila}>
                <View style={styles.iconoReclamo}>
                    <FontAwesome5 name="clipboard" size={40}/>
                </View>

                <Pressable onPress={() => navigation.navigate("GenerarReclamo")}>
                    <StyledText style={styles.texto}>Generar Reclamo</StyledText>
                </Pressable>
            </View>

            <View style={styles.fila}>
                <View style={styles.iconoDenuncia}>
                    <AntDesign name="exception1" size={40}/>
                </View>
                <Pressable onPress={() => navigation.navigate("GenerarDenuncia")}>
                    <StyledText style={styles.texto}>Generar Denuncia</StyledText>
                </Pressable>
            </View>

            <View style={styles.fila}>
                <View style={styles.iconoServicio}>
                    <FontAwesome5 name="tools" size={40} color="black"/>
                </View>
                <Pressable onPress={() => navigation.navigate("GenerarServicio")}>
                    <StyledText style={styles.texto}>Cargar Servicio/Comercio</StyledText>
                </Pressable>
            </View>

            <View style={styles.fila}>
                <View style={{padding: 10, backgroundColor: colors.blue300, borderRadius: 50000}}>
                    <AntDesign name="questioncircle" size={40} color="black"/>
                </View>
                <Pressable onPress={() => navigation.navigate("SolicitarAyuda")}>
                    <StyledText style={styles.texto}>Solicitar ayuda</StyledText>
                </Pressable>
            </View>

        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        marginTop: 30,
        alignItems: "center"
    },
    texto: {
        paddingLeft: 20,
        paddingBottom: 5
    },
    iconoReclamo: {
        borderRadius: 4000,
        backgroundColor: colors.blue600,
        padding: 10,
        paddingHorizontal: 15
    },
    iconoDenuncia: {
        borderRadius: 4000,
        backgroundColor: colors.orange500,
        padding: 10,
    },
    iconoServicio: {
        borderRadius: 4000,
        backgroundColor: colors.green400,
        padding: 10
    }
})
