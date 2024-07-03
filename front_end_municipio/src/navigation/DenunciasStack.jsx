import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DenunciasScreen from "../screens/DenunciasScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";
import DetalleDenunciaScreen from "../screens/DetalleDenunciaScreen";
import {useSelector} from "react-redux";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import UsuarioNoRegistradoCard from "../components/UsuarioNoRegistradoCard";

export default function DenunciasStack() {
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
                name={"DenunciasScreen"}
                component={DenunciasScreen}
                options={{
                    header: () => (
                        <Header color={colors.orange500} title={"Denuncias"}/>
                    )
                }}
            />
            <Stack.Screen
                name={"DetalleDenuncia"}
                component={DetalleDenunciaScreen}
                options={{
                    header: () => (
                        <Header color={colors.orange500} title={"Denuncia"}/>
                    )
                }}
            />
        </Stack.Navigator>
    )
}
