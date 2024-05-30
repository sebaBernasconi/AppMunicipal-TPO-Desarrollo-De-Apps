import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DenunciasScreen from "../screens/DenunciasScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";

export default function DenunciasStack() {
    const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
