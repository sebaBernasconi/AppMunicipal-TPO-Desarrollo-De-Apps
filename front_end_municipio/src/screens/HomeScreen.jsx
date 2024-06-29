import {FlatList, StyleSheet} from 'react-native'
import React, {useCallback, useState} from 'react'
import ServicioCard from "../components/ServicioCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import HomeHeader from "../components/HomeHeader";
import {useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import {ipLocal} from "../global/ipLocal";

export default function HomeScreen({navigation}) {

    const [data, setData] = useState([])
    const {jwt} = useSelector((state) => state.authReducer.value)

    async function getLocales() {
        try {
            const response = await fetch(`http://${ipLocal}:8080/servicios/listarLocales`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (!response.ok) {
                throw new Error("Error en el fetch de locales")
            }
            const res = await response.json();
            setData(res)
        } catch (err) {
            console.error(err)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLocales()
        },[])
    )

    return (
        <>
            <HomeHeader/>
            <StyledScreenWrapper align_center no_padding_top>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => (
                        <ServicioCard
                            servicio={item}
                            navigation={navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.idLocal}
                    numColumns={2}
                    style={{paddingTop: 20}}
                    showsVerticalScrollIndicator={false}
                />
            </StyledScreenWrapper>
        </>
    )
}
const styles = StyleSheet.create({})
