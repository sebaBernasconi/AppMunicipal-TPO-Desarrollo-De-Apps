import {FlatList, StyleSheet, View} from 'react-native'
import React from 'react'
import ServicioCard from "../components/ServicioCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen({navigation}) {

    const fakeData = [
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 1,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 2,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 3,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 4,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 5,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 6,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 7,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 8,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 9,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 10,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 11,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 12,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 13,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        },
        {
            nombre: "Local o Servicio",
            tipo: "Restaurante",
            imagen: "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            id: 14,
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            precio: "$$$$"
        }
    ]

    return (
        <>
            <HomeHeader/>
            <StyledScreenWrapper align_center no_padding_top>
                <FlatList
                    data={fakeData}
                    renderItem={({item, index}) => (
                        <ServicioCard
                            servicio={item}
                            navigation={navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    style={{paddingTop: 20}}
                    showsVerticalScrollIndicator={false}
                />
            </StyledScreenWrapper>
        </>
    )
}
const styles = StyleSheet.create({})
