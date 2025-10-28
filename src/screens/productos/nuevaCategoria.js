import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/buttton";
import { COLORS, SIZES, GLOBAL_STYLES } from "../../styles/globalStyles";

export default function NuevaCategoria() {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <Layout titulo={"Nueva Categoría"}>
            {/* //? Nombre de la categoría */}
            <Text style={GLOBAL_STYLES.subtitle}>Nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre de la categoría"
                value={formData.nombre}
                onChangeText={(text) => handleChange("nombre", text)}
            />

            {/* //? Descripción */}
            <Text style={GLOBAL_STYLES.subtitle}>Descripción</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                multiline
                placeholder="Describe la categoría"
                value={formData.descripcion}
                onChangeText={(text) => handleChange("descripcion", text)}
            />

            {/* //* Botón Guardar */}
            <View style={{ marginTop: 20 }}>
                <GlobalButton
                    text={"Añadir nueva categoría"}
                    screen={"ProductosMain"}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: SIZES.small,
    marginBottom: 10,
  },
});
