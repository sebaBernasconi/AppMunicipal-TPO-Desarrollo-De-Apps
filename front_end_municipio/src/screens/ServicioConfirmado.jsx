import React from 'react';
import MunicipioHeader from '../components/MunicipioHeader';
import TextoConfirmacion from '../components/TextoConfirmacion';
import {View, StyleSheet} from "react-native";
import {colors} from "../global/colors";

export default function ServicioConfirmado() {
    return (
        <View style={{flex: 1}}>                  
            <MunicipioHeader />
            <TextoConfirmacion />
        </View>
    )
}
const styles = StyleSheet.create({

    header: {
        backgroundColor: colors.green,
    },
    container: {        
        backgroundColor: colors.green,
    }

})
