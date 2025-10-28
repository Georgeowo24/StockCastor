import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/globalStyles";

export function ProductoEstrella({ nombre, unidades }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Producto Estrella del Mes</Text>
            <Text style={styles.producto}>
                <Text style={styles.bold}>{nombre}</Text> ({unidades} unidades vendidas)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 5,
    },
    producto: {
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    bold: {
        fontWeight: "bold",
    },
});
