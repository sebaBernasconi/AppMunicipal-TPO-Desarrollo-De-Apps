import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";

export default function SolicitarAyudaScreen() {
    return (
        <StyledScreenWrapper align_center justify_center>
            <StyledText size36 dark_blue letters_spaced={2}>Para ayuda o consultas contactate 0810-123-456</StyledText>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({})
