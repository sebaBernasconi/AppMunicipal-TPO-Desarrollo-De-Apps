import { object, string, ref } from "yup";

export const changePasswordSchema = object().shape({
    dni: string()
        .required("El dni es requerido")
        .min(7, "DNI debe ser de al menos 7 caracteres"),

    token: string()
        .required("Token es requerido")
        .min(6, "Token debe tener al menos 6 caracteres"),

    newPassword: string()
        .required("Contrasenia es requerida")
        .min(6, "Contrasenia debe tener al menos 6 caracteres"),

    confirmNewPassword: string()
        .oneOf([ref("newPassword")], "Password must match")
        .required(),
});
