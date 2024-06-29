import {View} from 'react-native'
import React from 'react'
import MunicipioHeader from "../components/MunicipioHeader";
import {colors} from "../global/colors";
import StyledText from "../styledComponents/StyledText";
import StyledButton from "../styledComponents/StyledButton";

export default function DenunciaConfirmadaScreen({navigation}) {
    return (
        <View style={{backgroundColor: "#FFF", flex: 1}}>
            <MunicipioHeader bgColor={colors.orange500}/>
            <View style={{flex: 1, margin: 16, alignItems: "center", justifyContent: "center"}}>
                <View style={{
                    backgroundColor: colors.orange300,
                    height: 300,
                    width: "100%",
                    padding: 20,
                    gap: 20,
                    borderRadius: 10
                }}>
                    <StyledText size30>Denuncia Confirmada!</StyledText>
                    <StyledText size20>Tu denuncia ya fue enviada, será antendido con brevedad por nuestros
                        agentes. </StyledText>
                    <StyledText size20 bold>Gracias!</StyledText>
                </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
                <StyledButton text={"Home"} backgroundColor={colors.orange500} onPress={() => navigation.navigate("GenerarScreen")}/>
            </View>
        </View>
    )
}
