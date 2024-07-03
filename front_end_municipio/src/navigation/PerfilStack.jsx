import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PerfilScreen from "../screens/PerfilScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";
import {useSelector} from "react-redux";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import UsuarioNoRegistradoCard from "../components/UsuarioNoRegistradoCard";

export default function PerfilStack() {
    const Stack = createNativeStackNavigator();

    const {dni} = useSelector((state) => state.authReducer.value)

    if (dni === -1) {
        return (
            <StyledScreenWrapper align_center justify_center>
                <UsuarioNoRegistradoCard/>
            </StyledScreenWrapper>
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"PerfilScreen"}
                component={PerfilScreen}
                options={{
                    header: () => (
                        <Header color={colors.blue500} title={"Perfil"}/>
                    )
                }}
            />
        </Stack.Navigator>
    )
}
