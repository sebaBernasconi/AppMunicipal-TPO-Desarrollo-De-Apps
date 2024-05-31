import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function HomeScreen() {
    const tipoUsuario = "vecino"
    return (
        <>
            {tipoUsuario === "personal" ? (
                <View>
                    <Text style={{fontSize: 40}}>NO PODES HACER NADA PUTAZO</Text>
                </View>
            ) : (
                <View>
                    <Text style={{fontSize: 40}}>PASE MI REY</Text>
                </View>
            )}
        </>
    )
}
const styles = StyleSheet.create({})
