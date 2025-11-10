import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert} from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/button";
import { COLORS, SIZES, GLOBAL_STYLES } from "../../styles/globalStyles";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import { useNavigation } from "@react-navigation/native";


export default function NuevaCategoria() {
    const navigation = useNavigation();
    const { handleAddCategory, error } = useCategoriesViewModel();

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        if (!formData.nombre.trim()) {
            Alert.alert("Error", "El nombre de la categoría es obligatorio");
            return;
        }

        try {
            await handleAddCategory({
                nombreCategoria: formData.nombre.trim(),
                descripcion: formData.descripcion.trim(),
            });

            Alert.alert("Éxito", "Categoría creada correctamente", [
                { text: "OK", onPress: () => navigation.navigate("ProductosMain") },
            ]);
        } catch (e) {
            Alert.alert("Error", e.message || "No se pudo crear la categoría");
        }
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
                    onPress={handleSave}
                    color="success1"
                />
            </View>

            {error && (
                <Text style={{ color: COLORS.danger1, marginTop: 10 }}>
                    {error}
                </Text>
            )}
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
