import {FlatList, Image, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import ReclamoCard from "../components/ReclamoCard.jsx";
import {useFocusEffect} from "@react-navigation/native";
import {ipLocal} from "../global/ipLocal";
import {useSelector} from "react-redux";
import StyledText from "../styledComponents/StyledText";
import emptyImage from "../../assets/images/empty-blue.png";
import {colors} from "../global/colors";

export default function ReclamosScreen({navigation}) {
    const {jwt} = useSelector((state) => state.authReducer.value)
    const [reclamos, setReclamos] = useState([])

    async function getReclamos() {
        try {
            const response = await fetch(`http://${ipLocal}:8080/reclamos/listar`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
            })
            if (!response.ok) {
                throw new Error(await response.text())
            }
            const data = await response.json();
            setReclamos(data)
        }
        catch (error) {
            console.error(error)
        }

    }

    useFocusEffect(
        useCallback(() => {
            getReclamos()
        },[])
    )

    if (!reclamos.length) {
        return (
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <StyledText size30 letters_spaced={2} bold style={{color: colors.blue600}}>No has realizado reclamos</StyledText>
                <Image source={emptyImage} style={{width: 300, height: 300}}/>
            </View>
        )
    }

    return (
        <StyledScreenWrapper style={{paddingTop: 16}}>
            <FlatList
                data={reclamos}
                renderItem={({item}) => (
                    <ReclamoCard reclamo={item} navigation={navigation}/>
                )}
                keyExtractor={item => item.idReclamo}
            />
        </StyledScreenWrapper>
    )
}
