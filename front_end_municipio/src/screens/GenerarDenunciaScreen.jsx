import {StyleSheet, View} from "react-native";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import InputForm from "../components/InputForm";
import {useState} from "react";
import StyledButton from "../styledComponents/StyledButton";
import {colors} from "../global/colors";

export default function GenerarDenunciaScreen({navigation}){

    const [titulo,setTitulo] = useState("");
    const [descripcion,setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [dni,setDni] = useState("");

    const [checkbox,setCheckbox] = useState(false);

    return(
        <StyledScreenWrapper>
            <View>
                <InputForm
                    label={"Titulo"}
                    placeholder={"Titulo de la denuncia"}
                    onChange={setTitulo}
                    color={colors.orange500}/>
            </View>

            <View>
                <InputForm
                    label={"Descripcion"}
                    placeholder={"Ruidos molestos a altas horas de la madrugada"}
                    onChange={setDescripcion}
                    color={colors.orange500}/>
            </View>

            <View>
                <InputForm
                    label={"ubicacion"}
                    placeholder={"calle y numero"}
                    onChange={setUbicacion}
                    color={colors.orange500}/>
            </View>

            <View>
                <InputForm
                    label={"DNI"}
                    placeholder={"11111111"}
                    onChange={setDni}
                    color={colors.orange500}/>
            </View>

            <View style={styles.botones}>
                <View style={styles.botonCancelar}>
                    <StyledButton text={"cancelar"} backgroundColor={colors.grey} />
                </View>

                <View style={styles.botonAceptar}>
                    <StyledButton text={"Denunciar"} backgroundColor={colors.orange500} />
                </View>
            </View>
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    botones: {
        flexDirection: "row",
        paddingTop: 230
    },
    botonCancelar: {
        width:185
    },
    botonAceptar: {
        width:185,

    }
})