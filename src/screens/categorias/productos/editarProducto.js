import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Componentes
import Layout from "../../layout";
import GlobalButton from "../../../components/button";
import InputForm from "../../../components/inputForm";
import DropdownForm from "../../../components/dropdownForm";

// Estilos
import { COLORS, GLOBAL_STYLES } from "../../../styles/globalStyles";

// ViewModels
import { useProductViewModel } from "../../../ViewModels/productViewModel";
import { useProvidersViewModel } from "../../../ViewModels/providersViewModel";

export default function EditarProducto() {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params; 

    const { 
        handleEditProduct,
        pickImage, 
        selectedImageUri, 
        setSelectedImageUri, 
        isLoading,  
        measures, 
        isLoadingMeasures, 
        loadMeasuresForCategory 
    } = useProductViewModel();

    const { providers, isLoading: isLoadingProviders } = useProvidersViewModel();

    const [formData, setFormData] = useState({
        nombreProducto: product.nombreProducto,
        descripcion: product.descripcion,
        precioCompra: product.precioCompra?.toString(),
        precioVenta: product.precioVenta?.toString(),
        stockActual: product.stockActual?.toString(),
        stockMinimo: product.stockMinimo?.toString(),
    });

    const [openProvider, setOpenProvider] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(product.idProveedor);
    const [providerItems, setProviderItems] = useState([]);
    
    const [openMeasure, setOpenMeasure] = useState(false);
    const [selectedMeasure, setSelectedMeasure] = useState(product.idMedida);
    const [measureItems, setMeasureItems] = useState([]);

    // Cargar la imagen existente
    useEffect(() => {
        if (product.imagen) {
            setSelectedImageUri(product.imagen);
        }
    }, []);

    // Cargar medidas basándonos en la categoría del producto
    useEffect(() => {
        if (product.idCategoria) {
            loadMeasuresForCategory(product.idCategoria);
        }
    }, [product.idCategoria]);

    // Preparar items del Dropdown de Proveedores
    useEffect(() => {
        if (providers) {
            const items = providers.map(p => ({
                label: p.nombreProveedor,
                value: p.idProveedor
            }));
            setProviderItems(items);
        }
    }, [providers]);

    // Preparar items del Dropdown de Medidas
    useEffect(() => {
        if (measures) {
            const items = measures.map(m => ({
                label: m.nombreMedida, 
                value: m.idMedida
            }));
            setMeasureItems(items);
        }
    }, [measures]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const onOpenProvider = useCallback(() => {
        setOpenMeasure(false);
    }, []);

    const onOpenMeasure = useCallback(() => {
        setOpenProvider(false);
    }, []);
    
    const handleSave = async () => {
        if (!formData.nombreProducto || !formData.precioVenta) {
            Alert.alert("Error", "El nombre y precio de venta son obligatorios.");
            return;
        }

        const updatedProductData = {
            idProducto: product.idProducto,
            idCategoria: product.idCategoria, 
            idProveedor: selectedProvider,
            idMedida: selectedMeasure,
            nombreProducto: formData.nombreProducto,
            descripcion: formData.descripcion,
            precioCompra: parseFloat(formData.precioCompra) || 0,
            precioVenta: parseFloat(formData.precioVenta) || 0,
            stockActual: parseInt(formData.stockActual) || 0,
            stockMinimo: parseInt(formData.stockMinimo) || 0,
        };

        try {
            await handleEditProduct(updatedProductData);
            Alert.alert("Éxito", "Producto actualizado correctamente", [
                { text: "OK", onPress: () => navigation.navigate('CategoriasMain') }
            ]);
            setSelectedImageUri(null);
        } catch (e) {
            console.error(e);
            Alert.alert("Error", "No se pudo actualizar: " + e.message);
        }
    };

    return (
        <Layout titulo={'Editar Producto'}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ paddingBottom: 100 }}
                nestedScrollEnabled={true}
            >
                
                {/* //? Selector de Imagen */}
                <View style={styles.imageSection}>
                    <Text style={[GLOBAL_STYLES.subtitle2, { marginBottom: 10 }]}>Imagen del Producto</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {selectedImageUri ? (
                            <Image source={{ uri: selectedImageUri }} style={styles.imagePreview} />
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <Ionicons name="image-outline" size={40} color={COLORS.gray} />
                                <Text style={{ color: COLORS.gray, marginTop: 5 }}>Toca para cambiar imagen</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* //? Inputs Básicos */}
                <InputForm
                    label="Nombre del Producto"
                    iconName="cube-outline"
                    value={formData.nombreProducto}
                    onChangeText={(text) => handleChange("nombreProducto", text)}
                />
                
                <InputForm
                    label="Descripción"
                    iconName="document-text-outline"
                    value={formData.descripcion}
                    onChangeText={(text) => handleChange("descripcion", text)}
                    multiline={true}
                    numberOfLines={3}
                />
                
                {/* //? Dropdowns */}
                <DropdownForm
                    label="Proveedor"
                    iconName="people-outline"
                    placeholder="Selecciona un proveedor"
                    open={openProvider}
                    value={selectedProvider}
                    items={providerItems}
                    setOpen={setOpenProvider}
                    setValue={setSelectedProvider}
                    setItems={setProviderItems}
                    onOpen={onOpenProvider}
                    loading={isLoadingProviders}
                    zIndex={3000}
                    listMode="SCROLLVIEW"
                />

                <DropdownForm
                    label="Medida"
                    iconName="resize-outline"
                    placeholder="Selecciona una medida"
                    open={openMeasure}
                    value={selectedMeasure}
                    items={measureItems}
                    setOpen={setOpenMeasure}
                    setValue={setSelectedMeasure}
                    setItems={setMeasureItems}
                    onOpen={onOpenMeasure}
                    loading={isLoadingMeasures}
                    zIndex={2000}
                    listMode="SCROLLVIEW"
                />

                {/* //? Precios */}
                <View style={styles.rowContainer}>
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="P. Compra"
                            iconName="pricetag-outline"
                            keyboardType="numeric"
                            value={formData.precioCompra}
                            onChangeText={(text) => handleChange("precioCompra", text)}
                        />
                    </View>
                    <View style={{ width: 10 }} /> 
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="P. Venta"
                            iconName="cash-outline"
                            keyboardType="numeric"
                            value={formData.precioVenta}
                            onChangeText={(text) => handleChange("precioVenta", text)}
                        />
                    </View>
                </View>

                {/* //? Stocks */}
                <View style={styles.rowContainer}>
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="Stock Actual"
                            iconName="layers-outline"
                            keyboardType="numeric"
                            value={formData.stockActual}
                            onChangeText={(text) => handleChange("stockActual", text)}
                        />
                    </View>
                    <View style={{ width: 10 }} />
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="Stock Mín."
                            iconName="alert-circle-outline"
                            keyboardType="numeric"
                            value={formData.stockMinimo}
                            onChangeText={(text) => handleChange("stockMinimo", text)}
                        />
                    </View>
                </View>

                {/* //* Botón Guardar Cambios */}
                <View style={{ marginTop: 20 }}>
                    <GlobalButton
                        text={"Guardar Cambios"}
                        onPress={handleSave}
                        disabled={isLoading}
                        color="primary"
                    />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    imageSection: { marginBottom: 20 },
    imagePicker: {
        height: 150,
        width: "100%",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    imagePreview: { width: "100%", height: "100%", resizeMode: 'cover' },
    placeholderContainer: { alignItems: 'center', justifyContent: 'center' },
    rowContainer: { flexDirection: "row", justifyContent: "space-between" },
    inputWrapper: { flex: 1 }
});