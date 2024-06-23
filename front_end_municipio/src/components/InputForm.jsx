import {StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import {colors} from "../global/colors";
import Card from "../styledComponents/Card";
import StyledText from "../styledComponents/StyledText";

export default function InputForm({label, error, height, onChange, isSecure, top, multiline, color, mV, placeholder}) {
    const [input, setInput] = useState("");

    const onChangeText = (text) => {
        setInput(text);
        onChange(text);
    };

    return (
        <View style={styles.inputContainer}>
            <StyledText size20 style={{...styles.label, top: top ? top : 5}}>{label}</StyledText>
            <Card style={{marginVertical: mV ? mV : 25, height: height}} borderColor={color}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    placeholder={placeholder? placeholder : ""}
                    multiline={!!multiline}
                />
            </Card>
            {error ? <Text>* {error}</Text> : null}
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    label: {
        position: "absolute",
        zIndex: 100,
        top: 5,
        left: 23,
        padding: 5,
        fontFamily: "OpenSans",
        backgroundColor: colors.white,
    },
    input: {
        padding: 5,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "OpenSans"
    }
})
