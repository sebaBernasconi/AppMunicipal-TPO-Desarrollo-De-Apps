import {Pressable, View} from 'react-native'
import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {signupSchema} from "../validations/signupSchema";
import {setUserWaitingConfirmation} from "../features/auth/authSlice";
import InputForm from "../components/InputForm";
import StyledButton from "../styledComponents/StyledButton";
import StyledText from "../styledComponents/StyledText";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import {ipLocal} from "../global/ipLocal";

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [dni, setDni] = useState("");
    const [errorDni, setErrorDni] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [errorNombreCompleto, setErrorNombreCompleto] = useState("");

    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            setErrorMail("");
            setErrorDni("");
            setErrorNombreCompleto("");

            signupSchema.validateSync({email, dni, nombreCompleto});
            dispatch(setUserWaitingConfirmation(true))

            const response = await fetch(`http://${ipLocal}:8082/java_mail/generarUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, dni, tipoUsuario: "vecino"}),
            })

            if (!response.ok) {
                console.error((await response).text())
                return;
            }
            navigation.navigate("ConfirmacionVecino")

        } catch (err) {
            switch (err.path) {
                case "email":
                    setErrorMail(err.message);
                    break;
                case "dni":
                    setErrorDni(err.message);
                    break;
                case "nombreCompleto":
                    setErrorNombreCompleto(err.message);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <StyledScreenWrapper>
            <View style={{flex: 1}}>
                <View style={{alignItems: "center"}}>
                    <StyledText size30>Sign Up</StyledText>
                </View>
                <InputForm
                    label={"DNI"}
                    error={errorDni}
                    onChange={setDni}
                    placeholder={"DNI: 11111111"}
                />
                <InputForm
                    label={"Nombre completo"}
                    error={errorNombreCompleto}
                    onChange={setNombreCompleto}
                    placeholder={"Nombre completo"}
                />
                <InputForm
                    label={"Email"}
                    error={errorMail}
                    onChange={setEmail}
                    placeholder={"ejemplo@email.com"}
                />
                <View style={{alignItems: "flex-end"}}>
                    <Pressable onPress={() => navigation.navigate("Login")}
                               style={{marginTop: 10, marginBottom: 20}}>
                        <StyledText size20>¿Ya tiene cuenta?</StyledText>
                        <StyledText size20 light_blue>Inicie sesion</StyledText>
                    </Pressable>
                </View>
            </View>
            <StyledButton text={"Solicitar"} onPress={onSubmit} text_white/>
        </StyledScreenWrapper>
    )
}
