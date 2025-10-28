import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/globalStyles";

export function CardPedidos ({ pedidos }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Pedidos Pendientes</Text>
            <Text style={styles.valueOrders}>{pedidos}</Text>
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
    valueOrders: {
        color: COLORS.warning1,
        fontSize: SIZES.xlarge,
        fontWeight: "bold",
    },
});
