import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { useProvidersViewModel } from "../../ViewModels/providersViewModel";
import InputForm from "../../components/inputForm";

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
            <InputForm
                label="Nombre del proveedor"
                iconName="person-outline"
                placeholder="Juan J."
                value={formData.nombreProveedor}
                onChangeText={(text) => handleChange("nombreProveedor", text)}
            />

            {/* //? Teléfono */}
            <InputForm
                label="Teléfono"
                iconName="call-outline"
                placeholder="222 222 2222"
                keyboardType="numeric"
                value={formData.telefono}
                maxLength={10}
                onChangeText={(text) => handleChange("telefono", text)}
            />

            {/* //? Dirección */}
            <InputForm
                label="Dirección"
                iconName="location-outline"
                placeholder="Calle X, Col. Bosques, #00000"
                value={formData.direccion}
                onChangeText={(text) => handleChange("direccion", text)}
                multiline={true}
                numberOfLines={3}
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