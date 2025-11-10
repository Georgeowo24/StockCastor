import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/button"; 
import { COLORS, SIZES, GLOBAL_STYLES } from "../../styles/globalStyles"; 
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

// ViewModels
import { useProductViewModel } from "../../ViewModels/productViewModel";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import { useProvidersViewModel } from "../../ViewModels/providersViewModel";

export default function NuevoProducto() {
    const navigation = useNavigation();
    const { handleAddProduct, pickImage, selectedImageUri, setSelectedImageUri, isLoading,  measures, isLoadingMeasures, loadMeasuresForCategory } = useProductViewModel();

    // ViewModels para las listas
    const { categories, isLoading: isLoadingCategories } = useCategoriesViewModel();
    const { providers, isLoading: isLoadingProviders } = useProvidersViewModel();

    const [formData, setFormData] = useState({
        idCategoria: null, 
        idProveedor: null,
        idMedida: null,
        nombreProducto: "",
        descripcion: "",
        precioCompra: "",
        precioVenta: "",
        stockActual: "0",
        stockMinimo: "0",
    });

    useEffect(() => {
        if (formData.idCategoria) {
            loadMeasuresForCategory(formData.idCategoria);
        } else {
            loadMeasuresForCategory(null);
        }
        setFormData(prev => ({ ...prev, idMedida: null }));
    }, [formData.idCategoria]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    
    const handleSave = async () => {
        if (!formData.nombreProducto || !formData.precioVenta || !formData.idCategoria) {
            alert("El nombre, precio de venta y categoría son obligatorios.");
            return;
        }

        const productData = {
            ...formData,
            precioCompra: parseFloat(formData.precioCompra) || 0,
            precioVenta: parseFloat(formData.precioVenta) || 0,
            stockActual: parseInt(formData.stockActual) || 0,
            stockMinimo: parseInt(formData.stockMinimo) || 0,
        };

        try {
            // Guardar el producto
            await handleAddProduct(productData);
            
            alert("Producto añadido con éxito");
            setSelectedImageUri(null); // Limpiamos la imagen
            navigation.goBack();
        } catch (e) {
            console.error(e);
            alert("Error al guardar el producto: " + e.message);
        }
    };

    return (
        <Layout titulo={'Nuevo Producto'}>
            <Text style={GLOBAL_STYLES.subtitle}>Imagen del Producto</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {selectedImageUri ? (
                    <Image source={{ uri: selectedImageUri }} style={styles.imagePreview} />
                ) : (
                    <Text>Seleccionar imagen</Text>
                )}
            </TouchableOpacity>

            <Text style={GLOBAL_STYLES.subtitle}>Nombre del Producto</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: Martillo de uña"
                value={formData.nombreProducto}
                onChangeText={(text) => handleChange("nombreProducto", text)}
            />
            
            <Text style={GLOBAL_STYLES.subtitle}>Descripción</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Breve descripción del producto"
                value={formData.descripcion}
                onChangeText={(text) => handleChange("descripcion", text)}
                multiline
            />

            <Text style={GLOBAL_STYLES.subtitle}>Categoría</Text>
            <View style={styles.pickerContainer}>
                {isLoadingCategories ? <ActivityIndicator /> : (
                    <Picker
                        selectedValue={formData.idCategoria}
                        onValueChange={(itemValue) => handleChange("idCategoria", itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Seleccione una categoría --" value={null} />
                        {categories.map((cat) => (
                            <Picker.Item key={cat.idCategoria} label={cat.nombreCategoria} value={cat.idCategoria} />
                        ))}
                    </Picker>
                )}
            </View>
            
            <Text style={GLOBAL_STYLES.subtitle}>Proveedor (Opcional)</Text>
            <View style={styles.pickerContainer}>
                {isLoadingProviders ? <ActivityIndicator /> : (
                    <Picker
                        selectedValue={formData.idProveedor}
                        onValueChange={(itemValue) => handleChange("idProveedor", itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Seleccione un proveedor --" value={null} />
                        {providers.map((prov) => (
                            <Picker.Item key={prov.idProveedor} label={prov.nombreProveedor} value={prov.idProveedor} />
                        ))}
                    </Picker>
                )}
            </View>

            <Text style={GLOBAL_STYLES.subtitle}>Medida</Text>
            <View style={styles.pickerContainer}>
                {/* Mostramos un ActivityIndicator si está cargando medidas */}
                {isLoadingMeasures ? <ActivityIndicator /> : (
                    <Picker
                        // El picker se deshabilita si no hay categoría o si no hay medidas
                        enabled={!!formData.idCategoria && measures.length > 0}
                        selectedValue={formData.idMedida}
                        onValueChange={(itemValue) => handleChange("idMedida", itemValue)}
                        style={styles.picker}
                    >
                        {/* Mensaje dinámico basado en la selección de categoría */}
                        {!formData.idCategoria ? (
                            <Picker.Item label="-- Seleccione una categoría primero --" value={null} />
                        ) : measures.length === 0 ? (
                            <Picker.Item label="-- No hay medidas para esta categoría --" value={null} />
                        ) : (
                            <Picker.Item label="-- Seleccione una medida --" value={null} />
                        )}
                        
                        {/* Mapeamos las medidas cargadas */}
                        {measures.map((med) => (
                            <Picker.Item key={med.idMedida} label={med.medida} value={med.idMedida} />
                        ))}
                    </Picker>
                )}
            </View>


            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={GLOBAL_STYLES.subtitle}>Precio Compra</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={formData.precioCompra}
                        onChangeText={(text) => handleChange("precioCompra", text)}
                    />
                </View>
                <View style={styles.column}>
                    <Text style={GLOBAL_STYLES.subtitle}>Precio Venta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={formData.precioVenta}
                        onChangeText={(text) => handleChange("precioVenta", text)}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={GLOBAL_STYLES.subtitle}>Stock Actual</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0"
                        keyboardType="numeric"
                        value={formData.stockActual}
                        onChangeText={(text) => handleChange("stockActual", text)}
                    />
                </View>
                <View style={styles.column}>
                    <Text style={GLOBAL_STYLES.subtitle}>Stock Mínimo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0"
                        keyboardType="numeric"
                        value={formData.stockMinimo}
                        onChangeText={(text) => handleChange("stockMinimo", text)}
                    />
                </View>
            </View>


            <View style={{ marginTop: 20, marginBottom: 200 }}>
                <GlobalButton
                    text={"Guardar Producto"}
                    onPress={handleSave}
                    disabled={isLoading}
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
        marginHorizontal: 4,
    },
    imagePicker: {
        height: 150,
        width: "100%",
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        overflow: "hidden",
    },
    imagePreview: {
        width: "100%",
        height: "100%",
    },
    pickerContainer: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    picker: {
        height: 50, 
        width: '100%',
        color: COLORS.black,
    }
});
