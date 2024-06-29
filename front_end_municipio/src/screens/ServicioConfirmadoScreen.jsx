import {View} from 'react-native'
import React from 'react'
import MunicipioHeader from "../components/MunicipioHeader";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import StyledText from "../styledComponents/StyledText";

export default function ServicioConfirmadoScreen({navigation}) {
    return (
        <View style={{backgroundColor: "#FFF", flex: 1}}>
            <MunicipioHeader bgColor={colors.green400}/>
            <View style={{flex: 1, margin: 16, alignItems: "center", justifyContent: "center"}}>
                <View style={{
                    backgroundColor: colors.green200,
                    height: 300,
                    width: "100%",
                    padding: 20,
                    gap: 20,
                    borderRadius: 10
                }}>
                    <StyledText size30>Servicio Creado!</StyledText>
                    <StyledText size20>Tu servicio se ha creado correctamente! </StyledText>
                    <StyledText size20 bold>Gracias!</StyledText>
                </View>
            </View>
            <View style={{paddingHorizontal: 10}}>
                <StyledButton text={"Home"} backgroundColor={colors.green400} onPress={() => navigation.navigate("GenerarScreen")}/>
            </View>
        </View>
    )
}