import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReclamosScreen from "../screens/ReclamosScreen";
import Header from "../components/Header";
import {colors} from "../global/colors";

export default function ReclamosStack() {
    const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
