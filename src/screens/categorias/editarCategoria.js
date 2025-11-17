import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Layout from "../layout"; 
import GlobalButton from "../../components/button";
import DropdownForm from "../../components/dropdownForm";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import InputForm from "../../components/inputForm";
import { useMeasuresViewModel } from "../../ViewModels/measuresViewModel";
import MeasureList from "../../components/medidas/measureList";


export default function EditarCategoria() {
    const navigation = useNavigation();
    const route = useRoute(); // 1. Obtenemos la ruta
    const { category } = route.params; // Obtenemos el objeto 'category' que pasamos

    // 3. Obtenemos 'handleEditCategory' del ViewModel
    const { handleEditCategory, error } = useCategoriesViewModel();
    const { measureTypes, isLoading: isLoadingMeasures } = useMeasuresViewModel();

    // 2. Inicializamos el estado con los datos de la categoría
    const [formData, setFormData] = useState({
        nombreCategoria: category.nombreCategoria || "",
        descripcion: category.descripcion || "",
    });

    const [open, setOpen] = useState(false);
    // 2. Inicializamos el valor seleccionado del dropdown
    const [selectedValue, setSelectedValue] = useState(category.idTipoMedida); 
    const [items, setItems] = useState([]);

    
    // Este useEffect para poblar el dropdown se mantiene igual
    useEffect(() => {
        if (measureTypes) {
            const formattedItems = measureTypes.map((type) => ({
                label: type.nombreTipoMedida,
                value: type.idTipoMedida,
            }));
            setItems(formattedItems);
        }
    }, [measureTypes]);

    // Esta función se mantiene igual
    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    // 3. Cambiamos 'handleSave' por 'handleUpdate'
    const handleUpdate = async () => {
        if (!formData.nombreCategoria.trim()) {
            Alert.alert("Error", "El nombre de la categoría es obligatorio");
            return;
        }

        if (!selectedValue) {
            Alert.alert("Error", "El tipo de medida es obligatorio");
            return;
        }

        try {
            // Llamamos a la función de editar, pasando también el ID
            const success = await handleEditCategory({
                idCategoria: category.idCategoria, // ¡Importante!
                nombreCategoria: formData.nombreCategoria.trim(),
                descripcion: formData.descripcion.trim(),
                idTipoMedida: selectedValue,
            });

            if ( success ) {
                Alert.alert("Éxito", "Categoria actualizada correctamente", [
                   // Regresamos a la pantalla de Info (que se actualizará sola)
                   { text: "OK", onPress: () => navigation.goBack() } 
                ]);
            }
            // El error se mostrará automáticamente por el 'error' del ViewModel
        } catch (e) {
            Alert.alert("Error", e.message || "No se pudo actualizar la categoría");
        }
    };

    return (
        // Cambiamos el título del Layout
        <Layout titulo={"Editar Categoría"}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* Los inputs ya están bindeados al 'formData' inicializado */}
                <InputForm
                    label="Nombre:"
                    iconName="pricetag-outline"
                    placeholder="Playeras"
                    value={formData.nombreCategoria}
                    onChangeText={(text) => handleChange("nombreCategoria", text)} 
                />

                <InputForm
                    label="Descripción:"
                    iconName="reader-outline"
                    placeholder="Playeras rojas de manga corta"
                    value={formData.descripcion}
                    onChangeText={(text) => handleChange("descripcion", text)}
                />

                {/* El dropdown ya está bindeado al 'selectedValue' inicializado */}
                <DropdownForm
                    label="Tipo de Medida"
                    iconName="scale-outline"
                    placeholder="Selecciona un tipo de medida"
                    
                    open={open}
                    value={selectedValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedValue}
                    setItems={setItems}
                    
                    zIndex={1000} 
                    
                    loading={isLoadingMeasures}
                    listMode="SCROLLVIEW"
                />

                <MeasureList idTipoMedida={ selectedValue }/>

                
                {/* Cambiamos el texto y el handler del botón */}
                <View style={{ marginTop: 20, zIndex: 1 }}>
                    <GlobalButton
                        text={"Guardar Cambios"}
                        onPress={handleUpdate}
                        color="success1"
                    />
                </View>

                {error && (
                    <Text style={{ color: COLORS.danger1, marginTop: 10, zIndex: 1 }}>
                        {error}
                    </Text>
                )}
            </ScrollView>
        </Layout>
    );
}

// Los estilos son idénticos a los de nuevaCategoria.js
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