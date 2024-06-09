import {StyleSheet, Text, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import Card from "../styledComponents/Card";
import StyledText from "../styledComponents/StyledText";
import {fonts} from "../global/fonts";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import HomeScreen from "./HomeScreen";

export default function DenunciaConfirmadaScreen({navigation}){
    return(
        <StyledScreenWrapper>
            <View style={styles.contenedor} >
                <Card style={styles.card} borderColor={colors.orange500}>
                    <StyledText>!Denuncia confirmada!</StyledText>
                    <Text style={styles.texto}>Tu denuncia ya fue enviada,
                        sera antendida con brevedad por nuestros agentes.
                    </Text>

                    <StyledText>Gracias.</StyledText>
                </Card>
            </View>

            <View style={styles.boton}>
                <StyledButton text={"Home"} backgroundColor={colors.orange500}/>
            </View>

        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.orange300
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