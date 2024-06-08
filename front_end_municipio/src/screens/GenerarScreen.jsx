import {Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {colors} from "../global/colors";
import ReclamosScreen from "./ReclamosScreen";
import * as RootNaigation from "../navigation/RootNavigation";
import ServicioConfirmado from "./ServicioConfirmado";
import GenerarServicios from "./GenerarServicios";



export default function GenerarScreen( {navigation} ) {
    return (
        <StyledScreenWrapper align_center>

            <View>

               <View style={styles.fila}>
                   <View style={styles.iconoReclamo}>
                       <FontAwesome5 name="clipboard" size={50}/>
                   </View>

                   <Pressable onPress={() =>
                       RootNaigation.navigate("ReclamosStack",{screen: "ReclamosScreen"})}>
                       <StyledText style={styles.texto}>Generar Reclamo</StyledText>
                   </Pressable>
               </View>

                <View style={styles.fila}>
                    <View style={styles.iconoDenuncia}>
                        <AntDesign name="exception1" size={50}/>
                    </View>
                    <Pressable onPress={() =>
                        RootNaigation.navigate("DenunciasStack",{screen:"DenunciasScreen"})}>
                        <StyledText style={styles.texto}>Generar Denuncia</StyledText>
                    </Pressable>
                </View>

                <View style={styles.fila}>
                    <View style={styles.iconoServicio}>
                        <FontAwesome5 name="tools" size={50} color="black" />
                    </View>
                    <Pressable onPress={() =>
                        RootNaigation.navigate({screen: GenerarScreen})}>
                        <StyledText style={styles.texto}>Cargar Servicio / Comercio</StyledText>
                    </Pressable>
                </View>

                <View style={styles.fila}>
                    <AntDesign name="questioncircle" size={50} color="black" />
                    <Pressable>
                        <StyledText style={styles.texto}>Solicitar ayuda</StyledText>
                    </Pressable>
                </View>
            </View>

        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        marginTop: 30,
    },
    texto: {
        paddingLeft: 20
    },
    iconoReclamo: {
        borderRadius: 400,
        backgroundColor: colors.blue600
    },
    iconoDenuncia:{
        borderRadius: 400,
        backgroundColor: colors.orange500
    },
    iconoServicio:{
        borderRadius: 400,
        backgroundColor: colors.green
    }
})
