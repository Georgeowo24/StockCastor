import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, GLOBAL_STYLES } from "../../styles/globalStyles";
import ButttonWhatsApp from "./buttonWhatsApp";
import GlobalButton from "../button";
import { Ionicons } from '@expo/vector-icons';

export default function CardProveedores({ nombre, telefono, direccion, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            {/* Nombre y Teléfono */}
            <View style={styles.topRow}>
                <View style={styles.nameContainer}>
                    <Ionicons name="person-circle-outline" size={40} color={COLORS.primary} />
                    <Text style={[styles.name]}>{nombre}</Text>
                </View>

                {telefono ? (
                    <ButttonWhatsApp telefono={telefono} />
                ) : null}
            </View>

            {/* Dirección */}
            {direccion ? (
                <View style={styles.row}>
                    <Ionicons name="location-outline" size={35} color={COLORS.primary} />
                    <Text style={[styles.address]}>{direccion}</Text>
                </View>
            ) : null}

            {/* Acciones */}
            <View style={styles.buttonsRow}>
                <GlobalButton
                    onPress={onEdit}
                    color="warning1"
                    style={styles.smallButton}
                    icon={<Ionicons name="create-outline" size={25} color="#fff" />}
                />

                <GlobalButton
                    onPress={onDelete}
                    color="danger1"
                    style={styles.smallButton}
                    icon={<Ionicons name="trash-outline" size={25} color="#fff" />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ebebeb",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 15,
        marginVertical: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "75%"
    },

    name: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "600",
        flexShrink: 1
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    address: {
        marginLeft: 8,
        flex: 1,
        color: "#444",
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        height: 45,
        borderRadius: 12,
    },
});
