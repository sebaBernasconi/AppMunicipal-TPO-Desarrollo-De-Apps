
import React from 'react'
import InputForm from '../components/InputForm'
import { NavigationContainer } from '@react-navigation/native'
import {StyleSheet} from 'react-native';



export default function GenerarServicios() {

    const [nombre, setNombre] = useState("");
    const [errorNombre, setErrorNombre] = useState("");

    const [descripcion, setDescripcion] = useState("");
    const [errorDni, setErrorDescripcion] = useState("");

    const [ubicacion, setUbicacion] = useState("");
    const [errorUbicacion, setErrorUbicacion] = useState("");

    const [telefono, setTelefono] = useState("");
    const [errorTelefono, setErrorTelefono] = useState("");

    const [precio, setPrecio] = useState("");
    const [errorPrecio, setErrorPrecio] = useState("");

    const vuelve = () => {
        navigation.goBack();
    }

    const onSubmit = () => {
        try {
            createSchema.validateSync({nombre, descripcion,ubicacion,telefono,precio});
            // triggerLogin({dni, password});
            dispatch(setUser())

        } catch (err) {
            switch (err.path) {
                case "nombre":
                    setErrorNombre(err.message);
                    break;
                case "descripcion":
                    setErrorDescripcion(err.message);
                    break;
                case "ubicacion":
                    setErrorUbicacion(err.message);
                    break;
                case "telefono":
                    setErrorTelefono(err.message);
                    break;
                case "precio":
                    setErrorPrecio(err.message)
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <View>
            <Text>GenerarScreen</Text>
            <InputForm
                label={"Nombre"}
                error={errorNombre}
                onChange={setNombre}
                placeholder={"Nombre del Servicio/Comercio"}
            />

            <InputForm
                label={"Descripcion"}
                error={errorDescripcion}
                onChange={setDescripcion}
                placeholder={"Contanos mas"}
            />


            <InputForm
                label={"Ubicacion"}
                error={errorUbicacion}
                onChange={setUbicacion}
                placeholder={"Calle y numero"}
            />

            <InputForm
                label={"Telefono"}
                error={errorTelefono}
                onChange={setTelefono}
                placeholder={"Ingrese su nro. de telefono"}
            />

            <InputForm
                label={"Precio"}
                error={errorPrecio}
                onChange={setPrecio}
                placeholder={"Precio estimado $$"}
            />

            <StyledButton
                            text={"Cancelar"}
                            no_margin_vertical
                            onPress={vuelve}
                            text_white
                            backgroundColor={colors.grey400}
            />
            <StyledButton text={"Crear"} onPress={onSubmit} text_white/>            
        </View>
    )
}
const styles = StyleSheet.create({
    
})
