import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/Header";
import DetallesServicioScreen from "../screens/DetallesServicioScreen";

export default function HomeStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={"Home"}
                component={HomeScreen}
            />
            <Stack.Screen
                name={"DetallesServicio"}
                component={DetallesServicioScreen}
            />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
