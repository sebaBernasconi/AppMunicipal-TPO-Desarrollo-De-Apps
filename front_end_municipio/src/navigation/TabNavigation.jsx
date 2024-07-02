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
import {useSelector} from "react-redux";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    const {dni, jwt} = useSelector((state) => state.authReducer.value)

    const [notificarReclamo, setNotificarReclamo] = useState(false);
    const [notificarDenuncia, setNotificarDenuncia] = useState(false);

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
                console.log(user)
                if (user.cambiosEnReclamo){
                    setNotificarReclamo(true)
                }

                if (user.cambiosEnDenuncia) {
                    setNotificarDenuncia(true)
                }
            }
            catch (err) {
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
                                <FontAwesome6 name="circle-exclamation" size={24} color="black" />
                                <FontAwesome5 name="clipboard" size={34} color={focused ? "black" : "grey"} />
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
                                <Ionicons name="add-circle" size={60} color={colors.blue500} />
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
                                <AntDesign name="exception1" size={34} color={focused ? "black" : colors.grey} />
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
                                <FontAwesome5 name="user-alt" size={34} color={focused ? "black" : "grey"} />
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