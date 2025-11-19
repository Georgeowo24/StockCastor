import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Componentes Personalizados
import Layout from "../../layout";
import GlobalButton from "../../../components/button";
import InputForm from "../../../components/inputForm";
import DropdownForm from "../../../components/dropdownForm";
import MeasureSelector from "../../../components/medidas/measureSelector";

// Estilos
import { COLORS, GLOBAL_STYLES, SIZES } from "../../../styles/globalStyles";

// ViewModels
import { useProductViewModel } from "../../../ViewModels/productViewModel";
import { useProvidersViewModel } from "../../../ViewModels/providersViewModel";

export default function NuevoProducto() {
    const navigation = useNavigation();
    const route = useRoute();
    const { idCategoria } = route.params || {};

    const { 
        handleAddProduct, 
        pickImage, 
        selectedImageUri, 
        setSelectedImageUri, 
        isLoading,  
        measures, 
        isLoadingMeasures, 
        loadMeasuresForCategory 
    } = useProductViewModel();

    const { providers, isLoading: isLoadingProviders } = useProvidersViewModel();

    // Estado del formulario
    const [formData, setFormData] = useState({
        nombreProducto: "",
        descripcion: "",
        precioCompra: "",
        precioVenta: "",
        stockActual: "0",
        stockMinimo: "0",
    });

    // Estados para Dropdown de Proveedores
    const [openProvider, setOpenProvider] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerItems, setProviderItems] = useState([]);

    // Estados para Dropdown de Medidas
    const [openMeasure, setOpenMeasure] = useState(false);
    const [selectedMeasure, setSelectedMeasure] = useState(null);
    const [measureItems, setMeasureItems] = useState([]);

    // Cargar medidas cuando hay categoría
    useEffect(() => {
        if (idCategoria) {
            loadMeasuresForCategory(idCategoria);
        }
    }, [idCategoria]);

    // Transformar datos para los Dropdowns
    useEffect(() => {
        if (providers) {
            const items = providers.map(p => ({
                label: p.nombreProveedor,
                value: p.idProveedor
            }));
            setProviderItems(items);
        }
    }, [providers]);

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

    // Cerrar otros dropdowns al abrir uno
    const onOpenProvider = useCallback(() => {
        setOpenMeasure(false);
    }, []);

    const onOpenMeasure = useCallback(() => {
        setOpenProvider(false);
    }, []);
    
    const handleSave = async () => {
        if (!formData.nombreProducto || !formData.precioVenta || !idCategoria) {
            alert("El nombre, precio de venta y categoría son obligatorios.");
            return;
        }

        const productData = {
            ...formData,
            idCategoria: idCategoria,
            idProveedor: selectedProvider,
            idMedida: formData.idMedida,
            precioCompra: parseFloat(formData.precioCompra) || 0,
            precioVenta: parseFloat(formData.precioVenta) || 0,
            stockActual: parseInt(formData.stockActual) || 0,
            stockMinimo: parseInt(formData.stockMinimo) || 0,
        };

        try {
            await handleAddProduct(productData);
            alert("Producto añadido con éxito");
            setSelectedImageUri(null);
            navigation.goBack();
        } catch (e) {
            console.error(e);
            alert("Error al guardar el producto: " + e.message);
        }
    };

    return (
        <Layout titulo={'Nuevo Producto'}>
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
                                <Text style={{ color: COLORS.gray, marginTop: 5 }}>Toca para seleccionar</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* //? Nombre del Producto */}
                <InputForm
                    label="Nombre del Producto"
                    iconName="cube-outline"
                    placeholder="Ej: Martillo de uña"
                    value={formData.nombreProducto}
                    onChangeText={(text) => handleChange("nombreProducto", text)}
                />
                
                {/* //? Descripción */}
                <InputForm
                    label="Descripción"
                    iconName="document-text-outline"
                    placeholder="Breve descripción del producto..."
                    value={formData.descripcion}
                    onChangeText={(text) => handleChange("descripcion", text)}
                    multiline={true}
                    numberOfLines={3}
                />
                
                {/* //? Dropdown Proveedor */}
                <DropdownForm
                    label="Proveedor (Opcional)"
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

                {/* //? Tags Medida */}
                <Text style={GLOBAL_STYLES.subtitle2}>Medida</Text>
                <View style={styles.selectorContainer}>
                    <MeasureSelector
                        measures={measures}
                        isLoading={isLoadingMeasures}
                        selectedId={formData.idMedida}
                        onSelect={(id) => handleChange("idMedida", id)}
                    />
                </View>

                {/* //? Precios (Fila) */}
                <View style={styles.rowContainer}>
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="P. Compra"
                            iconName="pricetag-outline"
                            placeholder="0.00"
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
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={formData.precioVenta}
                            onChangeText={(text) => handleChange("precioVenta", text)}
                        />
                    </View>
                </View>

                {/* //? Stocks (Fila) */}
                <View style={styles.rowContainer}>
                    <View style={styles.inputWrapper}>
                        <InputForm
                            label="Stock Actual"
                            iconName="layers-outline"
                            placeholder="0"
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
                            placeholder="0"
                            keyboardType="numeric"
                            value={formData.stockMinimo}
                            onChangeText={(text) => handleChange("stockMinimo", text)}
                        />
                    </View>
                </View>

                {/* //* Botón Guardar */}
                <View style={{ marginTop: 20 }}>
                    <GlobalButton
                        text={"Guardar Producto"}
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
    imageSection: {
        marginBottom: 20,
    },
    imagePicker: {
        height: 150,
        width: "100%",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderStyle: 'dashed', // Estilo punteado para indicar zona de carga
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilos para las filas de inputs
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // No agregamos marginBottom aquí porque InputForm ya tiene margin
    },
    inputWrapper: {
        flex: 1, // Permite que cada input tome el 50% del espacio
    }
});