import {FlatList, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import DenunciaCard from "../components/ReclamoCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import {ipLocal} from "../global/ipLocal";
import {useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import ReclamoCard from "../components/ReclamoCard";

export default function DenunciasScreen() {
    const {jwt} = useSelector((state) => state.authReducer.value)
    const [denuncias, setDenuncias] = useState([])

    async function getDenuncias(){

        try {
            const response = await fetch(`http://${ipLocal}:8080/denuncias/listar`,{
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${jwt}`
                },
            })

            if (!response.ok){
                throw new Error(await response.text())
            }

            const data = await response.json();
            setDenuncias(data)
        }catch (error){
            console.error(error)
        }

    }

    useFocusEffect(
        useCallback(() => {
            getDenuncias()
        },[])
    )

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
const styles = StyleSheet.create({})
