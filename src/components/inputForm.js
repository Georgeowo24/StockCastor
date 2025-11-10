import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, GLOBAL_STYLES, SIZES } from "../styles/globalStyles";

export default function InputForm ({ label, iconName, ...props }) {
    const [isFocused, setIsFocused] = useState(false);

    const containerStyles = [
        styles.inputContainer,
        isFocused ? styles.inputContainerFocused : {}
    ];

    const iconColor = isFocused ? COLORS.primary : COLORS.gray;

    return (
        <View style={ styles.wrapper }>
            <Text style={[GLOBAL_STYLES.subtitle2, styles.label]}>{label}</Text>

            <View style={containerStyles}>
                { iconName && (
                    <Ionicons name={iconName} size={22} color={iconColor} style={styles.icon} />
                )}

                <TextInput 
                    style={styles.input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={COLORS.gray}
                    {...props}
                />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16
    },
    label: {
        marginBottom: 6
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1.5, 
        borderColor: COLORS.gray, 
        borderRadius: 12,
        minHeight: 55, 
    },
    inputContainerFocused: {
        borderColor: COLORS.primary,
    },
    icon: {
        marginLeft: 15,
        marginRight: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 16, 
        color: COLORS.black
    },
});