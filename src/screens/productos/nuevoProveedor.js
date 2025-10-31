import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/buttton";
import { COLORS, SIZES, GLOBAL_STYLES } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useProvidersViewModel } from "../../ViewModels/providersViewModel";


export default function NuevoProveedor() {
    const navigation = useNavigation();
    const { handleAddProvider, error, isLoading } = useProvidersViewModel();

    const [formData, setFormData] = useState({
        nombreProveedor: "",
        telefono: "",
        direccion: "",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    
    const handleSave = async () => {
        if (!formData.nombreProveedor) {
            alert("El nombre del proveedor es obligatorio.");
            return;
        }

        try {
            await handleAddProvider(formData);
            alert("Proveedor añadido con éxito");
            navigation.goBack();
        } catch (e) {
            console.error(e);
            alert("Error al guardar el proveedor");
        }
    };

    return (
        <Layout titulo={'Nuevo Proveedor'}>
            {/* //? Nombre del proveedor */}
            <Text style={GLOBAL_STYLES.subtitle}>Nombre del proveedor</Text>
            <TextInput
                style={styles.input}
                placeholder="Juan J."
                value={formData.nombreProveedor}
                onChangeText={(text) => handleChange("nombreProveedor", text)}
            />
            
            {/* //? Stock actual */}
            <Text style={GLOBAL_STYLES.subtitle}>Telefono</Text>
            <TextInput
                style={styles.input}
                placeholder="222 222 2222"
                keyboardType="numeric"
                value={formData.telefono}
                maxLength={10}
                onChangeText={(text) => handleChange("telefono", text)}
            />

            {/* //? Dirección del proveedor */}
            <Text style={GLOBAL_STYLES.subtitle}>Dirección</Text>
            <TextInput
                style={styles.input}
                placeholder="Calle X, Col. Bosques, #00000"
                value={formData.direccion}
                onChangeText={(text) => handleChange("direccion", text)}
            />


            {/* //* Botón Guardar */}
            <View style={{ marginTop: 20 }}>
                <GlobalButton
                    text={"Añadir nuevo Proveedor"}
                    onPress={handleSave}
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
