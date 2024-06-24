import {Image, Pressable, ScrollView, StyleSheet, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import InputForm from "../components/InputForm";
import {useState} from "react";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";
import checkbox_checked from "../../assets/images/checkbox_checked.png";
import checkbox_not_checked from "../../assets/images/checkbox_not_checked.png";
import StyledText from "../styledComponents/StyledText";

export default function GenerarReclamoScreen({navigation}) {

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [dni, setDni] = useState("");

    const [checked, setChecked] = useState(false);

    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView>
                <View style={{flex: 1}}>
                    <InputForm
                        label={"Titulo"}
                        placeholder={"Titulo del Reclamo"}
                        onChange={setTitulo}
                    />

                    <InputForm
                        label={"Descripcion"}
                        placeholder={"Poste caido bloqueando calle"}
                        onChange={setDescripcion}
                        height={150}
                    />

                    <InputForm
                        label={"ubicacion"}
                        placeholder={"calle y numero"}
                        onChange={setUbicacion}
                    />

                    <InputForm
                        label={"DNI"}
                        placeholder={"11111111"}
                        onChange={setDni}
                    />

                    <Pressable style={{flexDirection: "row", gap: 10, alignItems: "center"}}
                               onPress={() => setChecked(!checked)}>
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
                        <StyledButton text={"Cancelar"} backgroundColor={colors.grey}
                                      onPress={() => navigation.goBack()}/>
                    </View>

                    <View style={styles.botonAceptar}>
                        <StyledButton text={"Reclamar"} backgroundColor={colors.blue400}/>
                    </View>
                </View>
            </ScrollView>
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    botones: {
        flexDirection: "row",
        gap: 10
    },
    botonCancelar: {
        flex: 1
    },
    botonAceptar: {
        flex: 1
    }
})