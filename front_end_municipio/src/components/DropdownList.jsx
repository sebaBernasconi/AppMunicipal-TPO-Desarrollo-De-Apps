import {StyleSheet, View} from 'react-native'
import {Dropdown} from "react-native-element-dropdown";
import StyledText from "../styledComponents/StyledText";
import {colors} from "../global/colors";
import Card from "../styledComponents/Card";


export default function DropdownList({idRubro, setIdRubro, borderColor}) {

    const data = [
        {label: "Electricidad", value: 1},
        {label: "Plomeria", value: 2},
        {label: "Albañileria", value: 3},
        {label: "Jardineria", value: 4},
        {label: "Caripinteria", value: 5},
        {label: "Pintura", value: 6},
        {label: "Cerrajeria", value: 7},
        {label: "Gas", value: 8},
        {label: "Limpieza", value: 9},
        {label: "Mantenimiento", value: 10}
    ]


    function handleDropdown(item) {
        setIdRubro(item.value)
    }

    return (
        <View style={{marginVertical: 20}}>
            <StyledText size20 style={styles.label}>Rubro</StyledText>
            <Card borderColor={borderColor}>
                <Dropdown
                    data={data}
                    labelField="label"
                    valueField="value"
                    onChange={(item) => handleDropdown(item)}
                    value={idRubro}
                    style={{height: 40, padding: 10}}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        position: "absolute",
        zIndex: 100,
        top: -20,
        left: 23,
        padding: 5,
        fontFamily: "OpenSans",
        backgroundColor: colors.white,
    },
})