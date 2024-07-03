import {StyleSheet, View} from 'react-native'
import React from 'react'
import StyledText from "../styledComponents/StyledText";
import StyledButton from "../styledComponents/StyledButton";
import {useDispatch} from "react-redux";
import {setUser} from "../features/auth/authSlice";
import {colors} from "../global/colors";

export default function UsuarioNoRegistradoCard() {
    const dispatch = useDispatch();

    return (
        <>
            <View style={styles.container}>
                <StyledText letters_spaced={2} bold style={{textAlign: "center"}}>Sin Autorizacion</StyledText>
                <StyledText size20>Debes iniciar sesion para acceder a esta pagina.</StyledText>
            </View>
            <StyledButton text={"Ir al Login"} onPress={() => dispatch(setUser({dni: null}))}
                          backgroundColor={colors.blue300}/>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 170,
        width: "100%",
        backgroundColor: colors.aqua,
        padding: 15,
        borderRadius: 15
    }
})
