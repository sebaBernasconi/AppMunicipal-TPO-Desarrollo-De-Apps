import {Pressable, StyleSheet, TextInput, View} from 'react-native'
import React from 'react'
import {AntDesign} from "@expo/vector-icons";
import {colors} from "../global/colors";

export default function HomeHeader() {
    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder={"Buscar..."} placeholderTextColor={"black"}/>
                <Pressable>
                    <AntDesign name="search1" size={24} color="black"/>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue300,
        width: "100%",
        padding: 16,
        height: 70
    },
    container: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: colors.blue100,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },
    input: {
        width: "80%",
        height: 40,
        fontSize: 16
    }
})
