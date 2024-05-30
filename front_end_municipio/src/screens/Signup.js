import {Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {useSignUpMutation} from "../services/authService";
import {signupSchema} from "../validations/signupSchema";
import {setUser} from "../features/auth/authSlice";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import StyledButton from "../styledComponents/StyledButton";
import StyledText from "../styledComponents/StyledText";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [triggerSignup, result] = useSignUpMutation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        try {
            setErrorMail("");
            setErrorPassword("");
            setErrorConfirmPassword("");

            signupSchema.validateSync({password, confirmPassword, email});
            triggerSignup({email, password});

        } catch (err) {
            switch (err.path) {
                case "email":
                    setErrorMail(err.message);
                    break;
                case "password":
                    setErrorPassword(err.message);
                    break;
                case "confirmPassword":
                    setErrorConfirmPassword(err.message);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (result.data) {
            dispatch(setUser(result.data));
        }
    }, [result]);

    return (
        <StyledScreenWrapper align_center>
            {!globalError ?
                (!result.isLoading ? (
                    <>
                        <StyledText size30>Sign Up</StyledText>
                        <InputForm
                            label={"DNI"}
                            error={errorMail}
                            onChange={setEmail}
                            placeholder={"DNI: 11111111"}
                        />
                        <InputForm
                            label={"Nombre Completo"}
                            error={errorPassword}
                            onChange={setPassword}
                            isSecure={true}
                            placeholder={"Nombre Completo"}
                        />
                        <Pressable onPress={() => navigation.navigate("Login")}
                                   style={{marginTop: 10, marginBottom: 20}}>
                            <StyledText size20>¿Ya tiene cuenta?</StyledText>
                            <StyledText size20 light_blue>Inicie sesion</StyledText>
                        </Pressable>
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
