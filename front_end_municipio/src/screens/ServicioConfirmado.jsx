import React from 'react';
import MunicipioHeader from '../components/MunicipioHeader';
import TextoConfirmacion from '../components/TextoConfirmacion';

export default function ServicioConfirmado() {
    return (
        <View style={{flex: 1}}>                  
            <MunicipioHeader >
            </MunicipioHeader>
            <TextoConfirmacion>
            </TextoConfirmacion>
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
