import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { GLOBAL_STYLES, COLORS } from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';

export default function GlobalButton({ text, screen, style, color = "primary" }) {
    const navigation = useNavigation();

    const handlePress = () => {
        if (!screen) return;

        if (screen.toLowerCase() === "volver") {
            navigation.goBack();
        } else {
            navigation.navigate(screen);
        }
    };

    const buttonColor = COLORS[color] || COLORS.primary;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }, style]}
            onPress={handlePress}
        >
            <Text style={GLOBAL_STYLES.textButtonWhite}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        height: 50,
        paddingVertical: 10,
        borderRadius: 15,
        marginVertical: 15,
    },
});
