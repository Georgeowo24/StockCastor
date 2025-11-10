import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, COLORS } from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';

export default function GlobalButton({ text, screen, onPress, style, color = "primary", icon = null }) {
    const navigation = useNavigation();
    const buttonColor = COLORS[color] || COLORS.primary;

    const handlePress = () => {
        if (onPress) return onPress();

        if (screen) {
            if (screen.toLowerCase() === "volver") navigation.goBack();
            else navigation.navigate(screen);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }, style]}
            onPress={handlePress}
        >
            <View style={styles.content}>
                {/* Ícono a la izquierda */}
                {icon && (
                    <View>{icon}</View>
                )}

                {/* Texto */}
                {text && (
                    <Text style={GLOBAL_STYLES.textButtonWhite}>{text}</Text>
                )}
            </View>
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
