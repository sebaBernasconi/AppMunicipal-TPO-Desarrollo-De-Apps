import {StyleSheet, Text} from 'react-native'
import StyledScreenWrapper from "../styledComponents/StyledScreenWrapper";
import {useState} from "react";
import {ipLocal} from "../global/ipLocal";
import {Dropdown} from "react-native-element-dropdown";


export default function DropdownList({}){

    const [isFocus, setIsFocus] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(1);

    const data = [
        {"label": "1", "value": 1},
        {"label": "2", "value": 2},
        {"label": "3", "value": 3},
    ]

    const renderLabel = () => {
        if (dropDownValue || isFocus){
            return(
                <Text>
                    Cantidad
                </Text>
            )
        }
        return null;
    }

    function handleDropdown(item){
        setDropDownValue(item.value)
    }

    return(
        <StyledScreenWrapper>
            {renderLabel()}
            <Dropdown
                data={data}
                labelField={label}
                valueField={value}
                onChange={(item) => handleDropdown(item)}
                value={dropDownValue}
                onFocus={setIsFocus(true)}
                onBlur={setIsFocus(false)}
            />
        </StyledScreenWrapper>
    )
}

const styles = StyleSheet.create({

})