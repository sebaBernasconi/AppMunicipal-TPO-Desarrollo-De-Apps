import { object, string, ref } from "yup";

export const signupSchema = object().shape({
    email: string().required("Email is required").email("Not a valid email"),

    dni: string()
        .required("El dni es requerido")
        .min(7, "DNI debe ser de al menos 7 caracteres"),

    nombreCompleto: string()
        .required("El nombre es requerido").matches(/^[a-zA-Z]+$/, "No se permiten numeros o caracteres especiales"),
});
