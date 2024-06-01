import {StyleSheet, TextInput, View} from 'react-native'
import React from 'react'
import {AntDesign} from "@expo/vector-icons";

export default function HomeHeader() {
    return (
        <View>
            <View>
                <TextInput />
                <AntDesign name="search1" size={24} color="black" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({})
