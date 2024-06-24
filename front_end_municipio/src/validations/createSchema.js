import {number, object, string} from "yup";

export const createSchema = object().shape({

    nombre: string()
            .required("Por favor ingrese nombre")
            .min(1,"Por favor ingrese nombre"),

    rubro: string()
        .required("Por favor ingrese el rubro")
        .min(1,"Por favor ingrese el rubro"),

    descripcion: string()
                 .required("Por favor ingrese una descripcion")
                 .min(1,"Por favor ingrese una descripcion"),

    promocion: string()
        .required("Por favor ingrese una promocion")
        .min(1,"Por favor ingrese una promocion"),

    ubicacion: string()
                .required("Por favor ingrese la ubicacion")
                .min(1,"Por favor ingrese la ubicacion"),

    telefono: string()
              .required("Por favor ingrese telefono")
              .min(1,"Por favor ingrese telefono"),

    precio: number()
            .min(1,"Por favor ingrese precio"),
    
});