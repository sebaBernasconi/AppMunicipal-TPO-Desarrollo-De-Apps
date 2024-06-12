import {Image, Pressable, StyleSheet, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import InputForm from "../components/InputForm";
import {useState} from "react";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import StyledText from "../styledComponents/StyledText";
import checkbox_not_checked from "../../assets/images/checkbox_not_checked.png";
import checkbox_checked from "../../assets/images/checkbox_checked.png";

export default function GenerarDenunciaScreen({navigation}) {

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [dni, setDni] = useState("");

    const [checked, setChecked] = useState(false);

    return (
        <StyledScreenWrapper>
            <View style={{flex: 1}}>
                <InputForm
                    label={"Titulo"}
                    placeholder={"Titulo de la denuncia"}
                    onChange={setTitulo}
                    color={colors.orange500}/>
                <InputForm
                    label={"Descripcion"}
                    placeholder={"Ruidos molestos a altas horas de la madrugada"}
                    onChange={setDescripcion}
                    color={colors.orange500}
                    height={150}
                />
                <InputForm
                    label={"ubicacion"}
                    placeholder={"calle y numero"}
                    onChange={setUbicacion}
                    color={colors.orange500}/>
                <InputForm
                    label={"DNI"}
                    placeholder={"11111111"}
                    onChange={setDni}
                    color={colors.orange500}/>

                <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}} onPress={() => setChecked(!checked)}>
                    {checked ? (
                        <Image source={checkbox_checked} style={{height: 30, width: 30}}/>
                    ) : (
                        <Image source={checkbox_not_checked} style={{height: 30, width: 30}}/>
                    )}
                    <StyledText size16>Acepto terminos y condiciones</StyledText>
                </Pressable>
            </View>

            <View style={styles.botones}>
                <View style={styles.botonCancelar}>
                    <StyledButton text={"cancelar"} backgroundColor={colors.grey}/>
                </View>

                <View style={styles.botonAceptar}>
                    <StyledButton text={"Denunciar"} backgroundColor={colors.orange500}/>
                </View>
            </View>
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    botones: {
        flexDirection: "row",
        gap: 10
    },
    botonCancelar: {
        width: 185
    },
    botonAceptar: {
        width: 185,
    },
    square: {
        borderWidth: 1, width: 30, height: 30
    }
})