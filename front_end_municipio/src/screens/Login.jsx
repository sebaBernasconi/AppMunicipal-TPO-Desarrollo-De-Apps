import {Pressable, View} from "react-native";
import React, {useEffect, useState} from "react";
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
import {ipLocal} from "../global/ipLocal";

export default function Login({navigation}) {
    const [dni, setDni] = useState("");
    const [errorDni, setErrorDni] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [result, setResult] = useState("");
    const [jwt, setJwt] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (result === "ERROR") {
            setGlobalError(true)
        }
        if (result === "OK") {
            insertSession({
                dni: dni,
                jwt: jwt
            }).catch(err => console.log(err.message))
            dispatch(setUser({jwt, dni}));
        }
    }, [result]);

    const onSubmit = () => {
        try {
            loginSchema.validateSync({dni, password});
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

    function handleGuest() {
        dispatch(setUser({dni: -1}))
    }

    async function login() {
        try {
            const data = {dni, password}
            const response = await fetch(`http://${ipLocal}:8080/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                setResult("ERROR")
                throw new Error("Error en el login")
            }
            const token = await response.text();
            setJwt(token)
            setResult("OK")
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
                            onPress={() => handleGuest()}
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
                            errorCode={"ERROR 401"}
                            errorMessage={"Credenciales invalidas"}
                        />
                        <StyledButton text={"Go Back"} onPress={() => setGlobalError(false)}/>
                    </>
                )}
        </StyledScreenWrapper>
    );
};