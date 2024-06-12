import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GenerarScreen from "../screens/GenerarScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";
import GenerarReclamoScreen from "../screens/GenerarReclamoScreen";
import GenerarDenunciaScreen from "../screens/GenerarDenunciaScreen";

export default function GenerarStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"GenerarScreen"}
                component={GenerarScreen}
                options={{
                    header: () => (
                        <Header color={colors.yellow} title={"¿Que necesitas hacer?"} style={{height: 80}}/>
                    )
                }}
            />
            <Stack.Screen
                name={"GenerarReclamo"}
                component={GenerarReclamoScreen}
                options={{
                    header: () => (
                        <Header color={colors.blue600} title={"Generar Reclamo"} style={{height: 80}}/>
                    )
                }}
            />
            <Stack.Screen
                name={"GenerarDenuncia"}
                component={GenerarDenunciaScreen}
                options={{
                    header: () => (
                        <Header color={colors.orange500} title={"Generar Denuncia"} style={{height: 80}}/>
                    )
                }}
            />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
