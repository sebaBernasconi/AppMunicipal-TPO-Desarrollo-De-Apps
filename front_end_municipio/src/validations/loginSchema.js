import {object, string} from "yup";

export const loginSchema = object().shape({
    dni: string()
        .required("El DNI es requerido").matches(/^[0-9]+$/, "No se permiten caracteres")
        .min(7, "DNI debe ser de al menos 7 caracteres"),

    password: string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
