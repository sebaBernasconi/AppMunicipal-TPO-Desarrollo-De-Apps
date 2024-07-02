import React, {useEffect, useState} from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ReclamosStack from "./ReclamosStack";
import GenerarStack from "./GenerarStack";
import DenunciasStack from "./DenunciasStack";
import PerfilStack from "./PerfilStack";
import {StyleSheet, View} from "react-native";
import {AntDesign, Entypo, FontAwesome5, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {colors} from "../global/colors";
import {ipLocal} from "../global/ipLocal";
import {useDispatch, useSelector} from "react-redux";
import {setNotificarDenuncia, setNotificarReclamo} from "../features/auth/authSlice";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    const {dni, jwt, notificarReclamo, notificarDenuncia} = useSelector((state) => state.authReducer.value)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://${ipLocal}:8080/usuarios/get/${dni}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
                if (!response.ok) {
                    throw new Error(await response.text())
                }
                const user = await response.json();
                if (user.cambiosEnReclamos) {
                    dispatch(setNotificarReclamo(true))
                }

                if (user.cambiosEnDenuncias) {
                    dispatch(setNotificarDenuncia(true))
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name={"HomeStack"}
                component={HomeStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <Entypo name="home" size={34} color={focused ? "black" : "grey"}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"ReclamosStack"}
                component={ReclamosStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                {notificarReclamo ? (
                                    <View>
                                        <FontAwesome5 name="clipboard" size={34} color={focused ? "black" : "grey"}/>
                                        <FontAwesome6 name="circle-exclamation" size={24} color="red" style={{position: "absolute", top: -9, right: -14}}/>
                                    </View>
                                ) : (

                                    <FontAwesome5 name="clipboard" size={34} color={focused ? "black" : "grey"}/>
                                )}
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"GenerarStack"}
                component={GenerarStack}
                options={{
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Ionicons name="add-circle" size={60} color={colors.blue500}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"DenunciasStack"}
                component={DenunciasStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                {notificarDenuncia ? (
                                    <View>
                                        <AntDesign name="exception1" size={34} color={focused ? "black" : colors.grey}/>
                                        <FontAwesome6 name="circle-exclamation" size={24} color="red" style={{position: "absolute", top: -9, right: -14}}/>
                                    </View>
                                ) : (
                                    <AntDesign name="exception1" size={34} color={focused ? "black" : colors.grey}/>
                                )}
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name={"PerfilStack"}
                component={PerfilStack}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <FontAwesome5 name="user-alt" size={34} color={focused ? "black" : "grey"}/>
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60
    }
})