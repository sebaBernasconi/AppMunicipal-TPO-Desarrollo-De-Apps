import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GenerarScreen from "../screens/GenerarScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";

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
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
