import {FlatList, StyleSheet} from 'react-native'
import React from 'react'
import ServicioCard from "../components/ServicioCard";
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";

export default function HomeScreen() {
    const tipoUsuario = "vecino"

    const fakeData = [
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 1
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 2
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 3
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 4
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 5
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 6
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 7
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 8
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 9
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 10
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 11
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 12
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 13
        },
        {
            "nombre": "Local o Servicio",
            "tipo": "Restaurante",
            "imagen": "https://images.unsplash.com/photo-1716847214624-1e8787d98b6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "id": 14
        }
    ]

    return (
        <StyledScreenWrapper align_center>
            <FlatList
                data={fakeData}
                renderItem={({item}) => (
                    <ServicioCard
                        nombre={item.nombre}
                        id={item.id}
                        imagen={item.imagen}
                        tipo={item.tipo}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </StyledScreenWrapper>
    )
}
const styles = StyleSheet.create({})
