import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "../services/authService";

export default configureStore({
    reducer: {
        authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(configureStore.dispatch);
