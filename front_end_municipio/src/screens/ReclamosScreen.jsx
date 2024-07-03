import {FlatList, Image, Pressable, View, StyleSheet, Text} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import ReclamoCard from "../components/ReclamoCard.jsx";
import {useFocusEffect} from "@react-navigation/native";
import {ipLocal} from "../global/ipLocal";
import {useDispatch, useSelector} from "react-redux";
import StyledText from "../styledComponents/StyledText";
import emptyImage from "../../assets/images/empty-blue.png";
import {colors} from "../global/colors";
import {setNotificarReclamo} from "../features/auth/authSlice";

export default function ReclamosScreen({navigation}) {
    const {dni, jwt} = useSelector((state) => state.authReducer.value)
    const [reclamos, setReclamos] = useState([])

    const dispatch = useDispatch();

    async function getReclamos() {
        try {
            const response = await fetch(`http://${ipLocal}:8080/reclamos/listar`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
            })
            if (!response.ok) {
                throw new Error(await response.text())
            }
            const data = await response.json();
            setReclamos(data)
        } catch (error) {
            console.error(error)
        }

    }

    async function getReclamosVecino(){
        try {
            const response = await fetch(`http://${ipLocal}:8080/reclamos/listarPorVecino/${dni}`,{
                method: 'GET',
                headers: {
                    "Authorization" : `Bearer ${jwt}`
                },
            })

            if (!response.ok){
                throw new Error((await response.text()))
            }

            const data = await response.json();
            setReclamos(data)
        }catch (error){
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getReclamos()
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
                if (user.cambiosEnReclamos) {
                    try {
                        const responsePost = await fetch(`http://${ipLocal}:8080/usuarios/actualizarCambioReclamo`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${jwt}`
                            },
                            body: dni
                        })
                        if (!responsePost.ok) {
                            throw new Error(await response.text())
                        }
                        dispatch(setNotificarReclamo(false))
                    } catch (err) {
                        console.error(err)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    if (!reclamos.length) {
        return (
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <StyledText size30 letters_spaced={2} bold style={{color: colors.blue600}}>No has realizado
                    reclamos</StyledText>
                <Image source={emptyImage} style={{width: 300, height: 300}}/>
            </View>
        )
    }

    return (
        <StyledScreenWrapper style={{paddingTop: 16}}>

            <View style={styles.pressableConteiner}>
                <Pressable style={styles.pressable} onPress={()  => getReclamos()}>
                    <Text style={styles.text}>Todos</Text>
                </Pressable>

                <Pressable style={styles.pressable} onPress={() => getReclamosVecino()}>
                    <Text style={styles.text}>Mis Reclamos</Text>
                </Pressable>
            </View>

            <FlatList
                data={reclamos}
                renderItem={({item}) => (
                    <ReclamoCard reclamo={item} navigation={navigation}/>
                )}
                keyExtractor={item => item.idReclamo}
            />
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({
    pressableConteiner: {
        flexDirection: "row",
        paddingTop: 10,
        paddingLeft: 190,
        gap: 6
    },

    pressable: {
        backgroundColor: colors.blue500,
        borderRadius: 8
    },

    text: {
        fontSize: 20
    }
})
