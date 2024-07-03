import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReclamosScreen from "../screens/ReclamosScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";
import DetalleReclamoScreen from "../screens/DetalleReclamoScreen";
import {useSelector} from "react-redux";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import UsuarioNoRegistradoCard from "../components/UsuarioNoRegistradoCard";

export default function ReclamosStack() {
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
                name={"ReclamosScreen"}
                component={ReclamosScreen}
                options={{
                    header: () => (
                        <Header color={colors.blue600} title={"Reclamos"}/>
                    )
                }}
            />
            <Stack.Screen
                name={"DetalleReclamo"}
                component={DetalleReclamoScreen}
                options={{
                    header: () => (
                        <Header color={colors.blue600} title={"Reclamo"}/>
                    )
                }}
            />
        </Stack.Navigator>
    )
}
