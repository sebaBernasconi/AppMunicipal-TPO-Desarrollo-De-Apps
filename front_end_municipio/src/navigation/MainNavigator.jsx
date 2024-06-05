import {StatusBar} from "react-native";
import React from "react";
import AuthStack from "./AuthStack";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import {useSelector} from "react-redux";

export default function MainNavigator() {
    // const {user} = useSelector((state) => state.authReducer.value)
    const user = true;

    return (
        <NavigationContainer>
            <StatusBar />
            {user ? <TabNavigation/> : <AuthStack/>}
        </NavigationContainer>
    );
};

