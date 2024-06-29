import {FlatList, Image, StyleSheet, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import DenunciaCard from "../components/DenunciaCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import {ipLocal} from "../global/ipLocal";
import {useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";
import emptyImage from "../../assets/images/empty-orange.png"
export default function DenunciasScreen({navigation}) {
    const {jwt} = useSelector((state) => state.authReducer.value)
    const [denuncias, setDenuncias] = useState([])

    async function getDenuncias() {

        try {
            const response = await fetch(`http://${ipLocal}:8080/denuncias/listar`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
            })

            if (!response.ok) {
                throw new Error(await response.text())
            }

            const data = await response.json();
            setDenuncias(data)
        } catch (error) {
            console.error(error)
        }

    }

    useFocusEffect(
        useCallback(() => {
            getDenuncias()
        }, [])
    )

    if (!denuncias.length) {
        return (
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <StyledText size30 letters_spaced={2} bold style={{color: colors.orange500}}>No has realizado denuncias</StyledText>
                <Image source={emptyImage} style={{width: 300, height: 300}}/>
            </View>
        )
    }

    return (
        <StyledScreenWrapper style={{paddingTop: 16}}>
            <FlatList
                data={denuncias}
                renderItem={({item}) => (
                    <DenunciaCard denuncia={item} navigation={navigation}/>
                )}
                keyExtractor={item => item.idDenuncia}
            />
        </StyledScreenWrapper>
    )
}
