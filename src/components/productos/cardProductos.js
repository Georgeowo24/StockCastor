import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../styles/globalStyles";

export default function CardProductos({ nombre, precio, stock, imagen }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imagen }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{nombre}</Text>
                <Text style={styles.precio}>${precio.toFixed(2)}</Text>
                <View
                    style={[
                        styles.stockContainer,
                        { backgroundColor: stock > 0 ? COLORS.warning2 : COLORS.danger2 },
                    ]}
                >
                    <Text
                        style={[
                        styles.stockText,
                        { color: stock > 0 ? COLORS.warning1 : COLORS.danger1 },
                        ]}
                    >
                        {stock > 0 ? `Stock: ${stock}` : "Sin stock"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginRight: 20,
        height: "300",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
        padding: 10,
    },
    image: {
        width: 220,
        height: 190,
        resizeMode: "cover",
        marginBottom: 10,
        borderRadius: 12,
    },
    infoContainer: {
        width: "100%",
        paddingHorizontal: 10,
    },
    nombre: {
        ...FONTS.subtitle,
        fontSize: SIZES.medium,
        marginBottom: 4,
        textAlign: "left",
    },
    precio: {
        color: COLORS.primary,
        fontSize: SIZES.large,
        fontWeight: "600",
        marginBottom: 6,
        textAlign: "left",
    },
    stockContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-end",
    },
    stockText: {
        fontSize: SIZES.sMedium,
        fontWeight: "600",
        textAlign: "right",
    },
});
