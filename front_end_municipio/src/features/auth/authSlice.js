import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            dni: null,
            jwt: null,
            imageCamera: null,
            profileImage: null,
            userWaitingConfirmation: false,
            notificarReclamo: false,
            notificarDenuncia: false
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.value = {
                dni: action.payload.dni,
                jwt: action.payload.jwt,
            };
        },
        setUserWaitingConfirmation: (state, action) => {
            state.value = {
                ...state.value,
                userWaitingConfirmation: action.payload
            }
        },
        clearUser: (state) => (state.value = { user: null, token: null }),
        setCameraImage: (state, action) => {
            state.value = {
                ...state.value,
                imageCamera: action.payload,
            };
        },
        setProfileImage: (state, action) => {
            state.value = {
                ...state.value,
                profileImage: action.payload,
            };
        },
        logout: (state) => {
            state.value = {
                user: null,
                token: null,
                imageCamera: null,
                localId: null,
                profileImage: null,
            }
        },
        setNotificarReclamo: (state, action) => {
            state.value = {
                ...state.value,
                notificarReclamo: action.payload,
            }
        },
        setNotificarDenuncia: (state, action) => {
            state.value = {
                ...state.value,
                notificarDenuncia: action.payload,
            }
        }
    },
});

export const { setUser, clearUser, setCameraImage, setProfileImage, logout, setUserWaitingConfirmation, setNotificarReclamo, setNotificarDenuncia } = authSlice.actions;

export default authSlice.reducer;
