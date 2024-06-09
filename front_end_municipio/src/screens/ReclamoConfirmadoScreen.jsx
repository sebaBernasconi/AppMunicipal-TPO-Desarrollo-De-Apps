import {StyleSheet, Text, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import Card from "../styledComponents/Card";
import StyledText from "../styledComponents/StyledText";
import {fonts} from "../global/fonts";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import HomeScreen from "./HomeScreen";

export default function ReclamoConfirmadoScreen({navigation}){
    return(
        <StyledScreenWrapper>
            <View style={styles.contenedor} >
                <Card style={styles.card}>
                    <StyledText>!Reclamo confirmado!</StyledText>
                    <Text style={styles.texto}>Tu reclamo ya fue enviado,
                        sera antendido con brevedad por nuestros agentes.
                    </Text>

                    <StyledText>Gracias.</StyledText>
                </Card>
            </View>

            <View style={styles.boton}>
                <StyledButton text={"Home"} backgroundColor={colors.blue400}/>
            </View>

        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.blue200
    },
    texto:{
        paddingTop:10,
        paddingBottom: 10,
        fontSize: 15
    },
    contenedor:{
        alignContent: "center",
        paddingTop: 200
    },
    boton:{
        paddingTop: 240
    }
})