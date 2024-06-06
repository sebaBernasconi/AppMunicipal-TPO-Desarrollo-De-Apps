import {number, object, string} from "yup";

export const createSchema = object().shape({

    nombre: string()
            .required("Por favor ingrese nombre")
            .min(1,"Por favor ingrese nombre"),

    descripcion: string()
                 .required("Por favor ingrese una descripcion")
                 .min(1,"Por favor ingrese una descripcion"),

    ubicacion: string()
                .required("Por favor ingrese la ubicacion")
                .min(1,"Por favor ingrese la ubicacion"),

    telefono: string()
              .required("Por favor ingrese telefono")
              .min(1,"Por favor ingrese telefono"),

    precio: number()
            .require("Por favor ingrese precio")
            .min(1,"Por favor ingrese precio"),
    
});