import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ReclamosStack from "./ReclamosStack";
import GenerarStack from "./GenerarStack";
import DenunciasStack from "./DenunciasStack";
import PerfilStack from "./PerfilStack";
import {StyleSheet, View} from "react-native";
import {AntDesign, Entypo, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {colors} from "../global/colors";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

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