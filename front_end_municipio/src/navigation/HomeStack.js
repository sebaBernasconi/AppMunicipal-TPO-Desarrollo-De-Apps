import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/Header";

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
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({})
