import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import ReclamoCard from "../components/ReclamoCard.jsx";

export default function ReclamosScreen({navigation}) {
    return (
        <StyledScreenWrapper style={{paddingTop: 16}}>
            <ReclamoCard navigation={navigation}/>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({})
