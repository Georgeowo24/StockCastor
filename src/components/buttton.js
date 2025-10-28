import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { GLOBAL_STYLES, COLORS } from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';

export default function PrimaryButton ({ text, screen, style }) {
    const navigation = useNavigation();

    const handlePress = () => {
        if (screen) {
            navigation.navigate(screen);
        }
    };

    // Allow parent components to pass layout/styling (e.g. flex, margins)
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
            <Text style={GLOBAL_STYLES.textButtonWhite}>{ text }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: 50,
        paddingVertical: 10,
        borderRadius: 15,
        marginVertical: 15,
    }
});