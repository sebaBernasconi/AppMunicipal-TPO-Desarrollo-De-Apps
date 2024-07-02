import {FlatList, Image, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import DenunciaCard from "../components/DenunciaCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import {ipLocal} from "../global/ipLocal";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";
import emptyImage from "../../assets/images/empty-orange.png"
import {setNotificarDenuncia} from "../features/auth/authSlice";

export default function DenunciasScreen({navigation, route}) {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)
    const [denuncias, setDenuncias] = useState([])

    const dispatch = useDispatch();

    async function getDenuncias() {
        try {
            const response = await fetch(`http://${ipLocal}:8080/denuncias/listar`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
            })

            if (!response.ok) {
                throw new Error(await response.text())
            }

            const data = await response.json();
            setDenuncias(data)
        } catch (error) {
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getDenuncias()
        }, [])
    )

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://${ipLocal}:8080/usuarios/get/${dni}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
                if (!response.ok) {
                    throw new Error(await response.text())
                }
                const user = await response.json();
                if (user.cambiosEnDenuncias) {
                    try {
                        const responsePost = await fetch(`http://${ipLocal}:8080/usuarios/actualizarCambioDenuncia`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${jwt}`
                            },
                            body: dni
                        })
                        if (!responsePost.ok) {
                            throw new Error(await response.text())
                        }
                        dispatch(setNotificarDenuncia(false))
                    } catch (err) {
                        console.error(err)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    if (!denuncias.length) {
        return (
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <StyledText size30 letters_spaced={2} bold style={{color: colors.orange500}}>No has realizado
                    denuncias</StyledText>
                <Image source={emptyImage} style={{width: 300, height: 300}}/>
            </View>
        )
    }

    return (
        <StyledScreenWrapper style={{paddingTop: 16}}>
            <FlatList
                data={denuncias}
                renderItem={({item}) => (
                    <DenunciaCard denuncia={item} navigation={navigation}/>
                )}
                keyExtractor={item => item.idDenuncia}
            />
        </StyledScreenWrapper>
    )
}
