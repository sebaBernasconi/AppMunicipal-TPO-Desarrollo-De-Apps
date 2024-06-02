import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PerfilScreen from "../screens/PerfilScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";

export default function PerfilStack() {
    const Stack = createNativeStackNavigator();

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
const styles = StyleSheet.create({})
