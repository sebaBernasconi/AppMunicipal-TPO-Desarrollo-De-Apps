import {Pressable} from "react-native";
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

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [triggerLogin, result] = useLoginMutation();

    useEffect(() => {
        if (result.error) {
            setGlobalError(true)
        }
        if (result.data) {
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken
            })
                .catch(err => console.log(err.message))
        }
    }, [result]);

    const onSubmit = () => {
        try {
            loginSchema.validateSync({password, email});
            triggerLogin({email, password});
        } catch (err) {
            switch (err.path) {
                case "email":
                    setErrorMail(err.message);
                    break;
                case "password":
                    setErrorPassword(err.message);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <StyledScreenWrapper align_center>
            {!globalError ?
                (!result.isLoading ? (
                    <>
                        <StyledText size36>Login</StyledText>
                        <InputForm
                            label={"DNI"}
                            error={errorMail}
                            onChange={setEmail}
                            placeholder={"DNI: 11111111"}
                        />
                        <InputForm
                            label={"Password"}
                            error={errorPassword}
                            onChange={setPassword}
                            isSecure={true}
                            placeholder={"Password"}
                        />
                        <Pressable onPress={() => navigation.navigate("Signup")}
                                   style={{marginTop: 10, marginBottom: 20}}>
                            <StyledText size20>¿No tiene cuenta?</StyledText>
                            <StyledText size20 light_blue>Solicitar</StyledText>
                        </Pressable>
                        <StyledButton text={"Login"} onPress={onSubmit} text_white/>
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