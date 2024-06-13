import {StyleSheet, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import StyledText from "../styledComponents/StyledText";
import InputForm from "../components/InputForm";
import StyledButton from "../styledComponents/StyledButton";
import {changePasswordSchema} from "../validations/changePasswordSchema";
import {useDispatch} from "react-redux";
import {setUser} from "../features/auth/authSlice";
import {insertSession} from "../db";

export default function CambiarPasswordScreen() {
    const [dni, setDni] = useState("");
    const [errorDni, setErrorDni] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorNewPassword, setErrorNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState("");
    const [result, setResult] = useState("")
    const [jwt, setJwt] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (result === "OK") {
            insertSession({
                dni: dni,
                jwt: jwt
            }).catch(err => console.log(err.message))
            dispatch(setUser({jwt, dni}));
        }
    }, [result]);

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
            setJwt(jwt);
            setResult("OK")
        } catch (err) {
            console.error(err)
        }
    }

    async function changePassword() {
        try {
            const oldPassword = password
            const data = {dni, oldPassword, newPassword}
            const response = await fetch("http://192.168.68.61:8080/auth/changePassword", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error("Error en el cambio de contrasenia")
            }
            console.log(data)
            console.log("CONTRASENIA CAMBIADA")
        } catch (error) {
            console.error(error)
        }

    }

    function onSubmit() {
        try {
            setErrorDni("");
            setErrorPassword("");
            setErrorNewPassword("");
            setErrorConfirmNewPassword("");

            const token = password
            changePasswordSchema.validateSync({token, confirmNewPassword, dni, newPassword});

            login().then(
                () => changePassword()
            )

        } catch (err) {
            switch (err.path) {
                case "dni":
                    setErrorDni(err.message);
                    break;
                case "token":
                    setErrorPassword(err.message);
                    break;
                case "newPassword":
                    setErrorNewPassword(err.message);
                    break;
                case "confirmNewPassword":
                    setErrorConfirmNewPassword(err.message);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <StyledScreenWrapper>
            <View style={{flex: 1}}>
                <StyledText>Bienvenido!</StyledText>
                <InputForm label={"DNI"} error={errorDni} onChange={setDni}/>
                <StyledText size16>Ingresa la contrasenia provista por email</StyledText>
                <InputForm
                    label={"Contrasenia"}
                    error={errorPassword}
                    onChange={setPassword}
                />
                <StyledText size16>Crea tu nueva contrasenia para la aplicacion</StyledText>
                <InputForm
                    label={"Nueva Contrasenia"}
                    error={errorNewPassword}
                    onChange={setNewPassword}
                    isSecure={true}
                />
                <InputForm
                    label={"Confirmar Nueva Contrasenia"}
                    error={errorConfirmNewPassword}
                    onChange={setConfirmNewPassword}
                    isSecure={true}
                />
            </View>
            <StyledButton text={"Ingresar a la aplicacion"} text_white onPress={onSubmit}/>
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({})
