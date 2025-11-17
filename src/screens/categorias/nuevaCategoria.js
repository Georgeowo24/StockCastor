import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/button";
import DropdownForm from "../../components/dropdownForm";
import { COLORS, SIZES } from "../../styles/globalStyles";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import InputForm from "../../components/inputForm";
import { useMeasuresViewModel } from "../../ViewModels/measuresViewModel";
import MeasureList from "../../components/medidas/measureList";


export default function NuevaCategoria() {
    const navigation = useNavigation();
    const { handleAddCategory, error } = useCategoriesViewModel();
    const { measureTypes, isLoading: isLoadingMeasures } = useMeasuresViewModel();

    const [formData, setFormData] = useState({
        nombreCategoria: "",
        descripcion: "",
    });

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null); 
    const [items, setItems] = useState([]);

    
    useEffect(() => {
        if (measureTypes) {
            const formattedItems = measureTypes.map((type) => ({
                label: type.nombreTipoMedida,
                value: type.idTipoMedida,
            }));
            setItems(formattedItems);
        }
    }, [measureTypes]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        if (!formData.nombreCategoria.trim()) {
            Alert.alert("Error", "El nombre de la categoría es obligatorio");
            return;
        }

        if (!selectedValue) {
            Alert.alert("Error", "El tipo de medida es obligatorio");
            return;
        }

        try {
            const success = await handleAddCategory({
                nombreCategoria: formData.nombreCategoria.trim(),
                descripcion: formData.descripcion.trim(),
                idTipoMedida: selectedValue,
            });

            if ( success ) {
                Alert.alert("Éxito", "Categoria agregada correctamente", [
                   { text: "OK", onPress: () => navigation.goBack() } 
                ]);
            }
        } catch (e) {
            Alert.alert("Error", e.message || "No se pudo crear la categoría");
        }
    };

    return (
        <Layout titulo={"Nueva Categoría"}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* //? Nombre de la categoría */}
                <InputForm
                    label="Nombre:"
                    iconName="pricetag-outline"
                    placeholder="Playeras"
                    value={formData.nombreCategoria}
                    onChangeText={(text) => handleChange("nombreCategoria", text)} 
                />

                {/* //? Descripción */}
                <InputForm
                    label="Descripción:"
                    iconName="reader-outline"
                    placeholder="Playeras rojas de manga corta"
                    value={formData.descripcion}
                    onChangeText={(text) => handleChange("descripcion", text)}
                />

                {/* //? Dropdown de Tipo de Medida */}
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

                
                {/* //* Botón Guardar */}
                <View style={{ marginTop: 20, zIndex: 1 }}>
                    <GlobalButton
                        text={"Añadir nueva categoría"}
                        onPress={handleSave}
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

// Los estilos no necesitan cambios
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