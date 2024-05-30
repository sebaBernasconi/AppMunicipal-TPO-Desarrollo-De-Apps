import {StatusBar} from "react-native";
import React from "react";
import AuthStack from "./AuthStack";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";

export default function MainNavigator() {
    const user = true /*TODO eliminar luego*/

    return (
        <NavigationContainer>
            <StatusBar />
            {user ? <TabNavigation/> : <AuthStack/>}
        </NavigationContainer>
    );
};

