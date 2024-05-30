import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            token: null,
            imageCamera: null,
            localId: null,
            profileImage: null,
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.value = {
                user: action.payload.email,
                token: action.payload.idToken,
                localId: action.payload.localId
            };
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
        }
    },
});

export const { setUser, clearUser, setCameraImage, setProfileImage, logout } = authSlice.actions;

export default authSlice.reducer;
