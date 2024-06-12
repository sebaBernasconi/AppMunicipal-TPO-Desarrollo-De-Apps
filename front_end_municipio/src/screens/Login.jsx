import {Pressable, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useLoginMutation} from "../services/authService";
import {loginSchema} from "../validations/loginSchema";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import {insertSession} from "../db";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import StyledButton from "../styledComponents/StyledButton";
import ErrorMessage from "../components/ErrorMessage";
import {colors} from "../global/colors";
import {setUser} from "../features/auth/authSlice";
import {useDispatch} from "react-redux";

export default function Login({navigation}) {
    const [dni, setDni] = useState("");
    const [errorDni, setErrorDni] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [triggerLogin, result] = useLoginMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (result.error) {
            setGlobalError(true)
        }
        if (result.data) {
            insertSession({
                dni: dni,
                jwt: result.data.jwt
            })
                .catch(err => console.log(err.message))
        }
    }, [result]);

    const onSubmit = () => {
        try {
            loginSchema.validateSync({dni, password});
            // triggerLogin({dni, password});
            login()

        } catch (err) {
            switch (err.path) {
                case "dni":
                    setErrorDni(err.message);
                    break;
                case "password":
                    setErrorPassword(err.message);
                    break;
                default:
                    break;
            }
        }
    };

    async function login() {
        try {
            const data = {dni, password}
            const response = await fetch("http://192.168.68.61:8080/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error("Error en el login")
            }
            const jwt = await response.text();
            dispatch(setUser({jwt, dni}));
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <StyledScreenWrapper>
            {!globalError ?
                (!result.isLoading ? (
                    <>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: "center"}}>
                                <StyledText size36>Login</StyledText>
                            </View>
                            <InputForm
                                label={"DNI"}
                                error={errorDni}
                                onChange={setDni}
                                placeholder={"DNI: 11111111"}
                            />
                            <InputForm
                                label={"Password"}
                                error={errorPassword}
                                onChange={setPassword}
                                isSecure={true}
                                placeholder={"Password"}
                            />
                            <View style={{alignItems: "flex-end"}}>
                                <Pressable onPress={() => navigation.navigate("Signup")}
                                           style={{marginTop: 10, marginBottom: 20}}>
                                    <StyledText size20>¿No tiene cuenta?</StyledText>
                                    <StyledText size20 light_blue>Solicitar</StyledText>
                                </Pressable>
                            </View>
                        </View>
                        <StyledButton
                            text={"Continuar como invitado"}
                            no_margin_vertical
                            onPress={onSubmit}
                            text_white
                            backgroundColor={colors.grey400}
                        />
                        <StyledButton text={"Iniciar Sesion"} onPress={onSubmit} text_white/>
                    </>
                ) : (
                    <Loader/>
                )) : (
                    <>
                        <ErrorMessage
                            errorCode={result.error.data.error.code}
                            errorMessage={result.error.data.error.message}
                        />
                        <StyledButton text={"Go Back"} onPress={() => setGlobalError(false)}/>
                    </>
                )}
        </StyledScreenWrapper>
    );
};