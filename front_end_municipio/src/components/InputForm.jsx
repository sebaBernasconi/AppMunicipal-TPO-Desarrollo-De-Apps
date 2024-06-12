import {StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import {colors} from "../global/colors";
import Card from "../styledComponents/Card";
import StyledText from "../styledComponents/StyledText";

export default function InputForm({label, error, height, onChange, isSecure, color, placeholder}) {
    const [input, setInput] = useState("");

    const onChangeText = (text) => {
        setInput(text);
        onChange(text);
    };

    return (
        <View style={styles.inputContainer}>
            <StyledText size20 style={styles.label}>{label}</StyledText>
            <Card style={{marginVertical: 15, height: height}} borderColor={color}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    placeholder={placeholder? placeholder : ""}
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
        top: -3,
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
