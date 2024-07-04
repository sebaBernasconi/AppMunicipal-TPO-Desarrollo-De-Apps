import {StatusBar} from "react-native";
import React, {useEffect} from "react";
import AuthStack from "./AuthStack";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import {useDispatch, useSelector} from "react-redux";
import {navigationRef} from "./RootNavigation";
import {fetchSession} from "../db";
import {setUser} from "../features/auth/authSlice";
import {isExpired} from "react-jwt";

export default function MainNavigator() {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const session = await fetchSession();
                if (session?.rows.length) {
                    const dni = session.rows._array[0];
                    const jwt = session.rows._array[1];
                    if (!isExpired(jwt)) {
                        dispatch(setUser(dni, jwt));
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        })();

    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar/>
            {dni ? <TabNavigation/> : <AuthStack/>}
        </NavigationContainer>
    );
};

