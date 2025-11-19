import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../styles/globalStyles";

export default function CardProductos({ nombre, precio, stock, imagen }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imagen }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.nombre} numberOfLines={1}>{nombre}</Text>
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
                        {stock > 0 ? `Stock: ${stock}` : "Agotado"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 15, // Reduje un poco el radio
        width: '100%',    // IMPORTANTE: Ahora ocupa todo el ancho que le de el padre
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        padding: 8,       // Reduje un poco el padding interno
        marginBottom: 5,  // Margen inferior interno pequeño
    },
    image: {
        width: "100%",    // IMPORTANTE: Se adapta al ancho de la card
        height: 120,      // Reduje la altura (antes 190) para que no se vea gigante
        resizeMode: "cover",
        marginBottom: 8,
        borderRadius: 10,
    },
    infoContainer: {
        width: "100%",
        paddingHorizontal: 5,
    },
    nombre: {
        ...FONTS.subtitle,
        fontSize: 14,     // Letra un poco más pequeña
        marginBottom: 4,
        textAlign: "left",
    },
    precio: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
        textAlign: "left",
    },
    stockContainer: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: "flex-start", // Cambié a flex-start para que se alinee a la izq
    },
    stockText: {
        fontSize: 10, // Letra más pequeña para el stock
        fontWeight: "600",
    },
});