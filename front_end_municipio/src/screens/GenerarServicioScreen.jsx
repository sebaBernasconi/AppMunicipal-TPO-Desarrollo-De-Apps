import React, {useState} from 'react'
import InputForm from '../components/InputForm'
import {ScrollView, StyleSheet, View} from 'react-native';
import {createSchema} from "../validations/createSchema";
import StyledButton from "../styledComponents/StyledButton";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";

export default function GenerarServicioScreen({navigation}) {

    const [nombre, setNombre] = useState("");
    const [errorNombre, setErrorNombre] = useState("");

    const [descripcion, setDescripcion] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");

    const [ubicacion, setUbicacion] = useState("");
    const [errorUbicacion, setErrorUbicacion] = useState("");

    const [telefono, setTelefono] = useState("");
    const [errorTelefono, setErrorTelefono] = useState("");

    const [precio, setPrecio] = useState("");
    const [errorPrecio, setErrorPrecio] = useState("");


    const onSubmit = () => {
        try {
            createSchema.validateSync({nombre, descripcion, ubicacion, telefono, precio});

        } catch (err) {
            switch (err.path) {
                case "nombre":
                    setErrorNombre(err.message);
                    break;
                case "descripcion":
                    setErrorDescripcion(err.message);
                    break;
                case "ubicacion":
                    setErrorUbicacion(err.message);
                    break;
                case "telefono":
                    setErrorTelefono(err.message);
                    break;
                case "precio":
                    setErrorPrecio(err.message)
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <StyledScreenWrapper no_padding_top>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <StyledText>GenerarScreen</StyledText>
                    <InputForm
                        label={"Nombre"}
                        error={errorNombre}
                        onChange={setNombre}
                        placeholder={"Nombre del Servicio/Comercio"}
                        color={colors.green}
                    />

                    <InputForm
                        label={"Descripcion"}
                        error={errorDescripcion}
                        onChange={setDescripcion}
                        placeholder={"Contanos mas"}
                        height={150}
                        color={colors.green}
                    />


                    <InputForm
                        label={"Ubicacion"}
                        error={errorUbicacion}
                        onChange={setUbicacion}
                        placeholder={"Calle y numero"}
                        color={colors.green}
                    />

                    <InputForm
                        label={"Telefono"}
                        error={errorTelefono}
                        onChange={setTelefono}
                        placeholder={"Ingrese su nro. de telefono"}
                        color={colors.green}
                    />

                    <InputForm
                        label={"Precio"}
                        error={errorPrecio}
                        onChange={setPrecio}
                        placeholder={"Precio estimado $$"}
                        color={colors.green}
                    />
                </View>
                <View style={{flexDirection: 'row', gap: 10, alignItems: "center"}}>
                    <View style={{flex: 1}}>
                        <StyledButton
                            text={"Cancelar"}
                            no_margin_vertical
                            onPress={() => navigation.goBack()}
                            text_white
                            backgroundColor={colors.grey400}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <StyledButton text={"Crear"} onPress={onSubmit} text_white backgroundColor={colors.green}/>
                    </View>
                </View>
            </ScrollView>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({})
