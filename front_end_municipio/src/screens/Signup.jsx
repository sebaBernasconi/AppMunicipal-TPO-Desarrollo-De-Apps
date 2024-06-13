import {Pressable, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {useSignUpMutation} from "../services/authService";
import {signupSchema} from "../validations/signupSchema";
import {setUser, setUserWaitingConfirmation} from "../features/auth/authSlice";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import StyledButton from "../styledComponents/StyledButton";
import StyledText from "../styledComponents/StyledText";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [dni, setDni] = useState("");
    const [errorDni, setErrorDni] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [errorNombreCompleto, setErrorNombreCompleto] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [result, setResult] = useState("")

    const dispatch = useDispatch();

    const onSubmit = () => {
        try {
            setErrorMail("");
            setErrorDni("");
            setErrorNombreCompleto("");

            signupSchema.validateSync({email, dni, nombreCompleto});
            dispatch(setUserWaitingConfirmation(true))
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
            {!globalError ?
                (!result.isLoading ? (
                    <>
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
                    </>
                ) : (
                    <Loader/>
                )) : (
                    <>
                        <ErrorMessage
                            errorCode={result.error.data.error.code}
                            errorMessage={result.error.data.error.message}
                        />
                        <StyledButton text={"Go Back"} onPress={() => setGlobalError(false)} filled orbitron_bold/>
                    </>
                )}

        </StyledScreenWrapper>
    )
}
