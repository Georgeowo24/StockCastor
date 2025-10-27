import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/globalStyles";

export function CardVentas({ ventas }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Ventas de Hoy</Text>
            <Text style={styles.valueSales}>${ventas.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 20,
        marginHorizontal: 5,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    label: {
        color: COLORS.gray,
        fontSize: SIZES.medium,
        fontWeight: "500",
        marginBottom: 6,
    },
    valueSales: {
        color: COLORS.green,
        fontSize: SIZES.xlarge,
        fontWeight: "bold",
    },
});
