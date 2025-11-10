import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/button";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useProvidersViewModel } from "../../ViewModels/providersViewModel";
import InputForm from "../../components/inputForm";

export default function EditarProveedor () {
    const navigation = useNavigation();
    const route = useRoute();

    const { provider } = route.params;

    const { handleEditProvider, error, isLoading } = useProvidersViewModel();

    const [ formData, setFormData ] = useState({
        idProveedor: provider.idProveedor,
        nombreProveedor: provider.nombreProveedor,
        telefono: provider.telefono,
        direccion: provider.direccion
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [ key ]: value });
    }

    const handleUpdate = async () => {
        if ( !formData.nombreProveedor ) {
            alert("El nombre del proveedor es obligatorio.");
            return;
        }
        try {
            await handleEditProvider(formData);
            alert("Proveedor actualizado con éxito");
            navigation.goBack();
        } catch ( error ) {
            console.error(e);
            alert("Error al actualizar el proveedor");
        }
    };

    return (
        <Layout titulo={"Editar Proveedor"}>
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

            <View style={{ marginTop: 20 }}>
                <GlobalButton
                    text={"Guardar Cambios"}
                    onPress={handleUpdate}
                />
            </View>

        </Layout>
    );
}

const styles = StyleSheet.create ({
    input : {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        padding: SIZES.small,
        marginBottom: 10,
    }
});
