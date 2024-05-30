import {StyleSheet} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MunicipioHeader from "../components/MunicipioHeader";

export default function AuthStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={
                () => ({
                    header: () => {
                        return (
                            <MunicipioHeader />
                        )
                    }
                })
            }
        >
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Signup"} component={Signup}/>
        </Stack.Navigator>
    )
}
