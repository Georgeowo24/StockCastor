import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, ActivityIndicator, Alert, FlatList, TouchableOpacity } from "react-native";
import { GLOBAL_STYLES, COLORS, SIZES } from "../../styles/globalStyles";
import GlobalButton from "../../components/button";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import { useProductViewModel } from "../../ViewModels/productViewModel"; // 1. Importar ViewModel de productos
import LayoutSinScroll from "../layoutSinScroll";
import { Ionicons } from "@expo/vector-icons";
import CardProductos from "../../components/productos/cardProductos"; // 2. Importar tu Card (ajusta la ruta si es necesario)

export default function InfoCategoria () {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryId } = route.params; 

    // ViewModel de Categorías
    const { 
        currentCategory, 
        isLoading: isLoadingCategory, 
        error: errorCategory, 
        loadCategoryDetails, 
        handleDeleteCategory 
    } = useCategoriesViewModel();

    // 3. ViewModel de Productos
    const { 
        products, 
        loadAllProducts, 
        isLoading: isLoadingProducts 
    } = useProductViewModel();

    // Estado local para productos filtrados
    const [categoryProducts, setCategoryProducts] = useState([]);

    useFocusEffect(
        useCallback(() => {
            if (categoryId) {
                loadCategoryDetails(categoryId);
                loadAllProducts(); // Cargar todos los productos al enfocar
            }
        }, [categoryId])
    );

    // 4. Efecto para filtrar productos cuando cambie la lista o la categoría
    useEffect(() => {
        if (products && categoryId) {
            const filtered = products.filter(p => p.idCategoria === categoryId);
            setCategoryProducts(filtered);
        }
    }, [products, categoryId]);

    const onDelete = () => {
        Alert.alert(
            "Eliminar Categoría",
            `¿Estás seguro de que deseas eliminar la categoría "${currentCategory?.nombreCategoria}"? Esta acción no se puede deshacer.`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: async () => {
                        await handleDeleteCategory(categoryId);
                        Alert.alert("Éxito", "Categoría eliminada correctamente.");
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const onEdit = () => {
        navigation.navigate('EditarCategoria', { category: currentCategory });
    };

    // Renderizado de items para la lista
    const renderProductItem = ({ item }) => (
        <TouchableOpacity 
            style={{ 
                width: '48%',   // Casi la mitad de la pantalla
                marginBottom: 15 
            }}
            onPress={() => navigation.navigate('InfoProducto', { product: item })}
        >
            <CardProductos 
                nombre={item.nombreProducto}
                precio={item.precioVenta}
                stock={item.stockActual}
                imagen={item.imagen}
            />
        </TouchableOpacity>
    );

    // Manejo de cargas y errores iniciales (Solo si no hay categoría)
    if (isLoadingCategory && !currentCategory) {
        return (
            <LayoutSinScroll titulo="Cargando...">
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            </LayoutSinScroll>
        );
    }

    if (errorCategory || !currentCategory) {
        return (
            <LayoutSinScroll titulo="Error">
                <Text style={styles.errorText}>Error al cargar la categoría o no encontrada.</Text>
                <GlobalButton text="Volver" onPress={() => navigation.goBack()} color="secondary" />
            </LayoutSinScroll>
        );
    }

    return (
        <LayoutSinScroll>
            {/* Cabecera de la Categoría */}
            <View style={{ alignItems: 'center', marginVertical: 0 }}>
                <View style={styles.iconContainer}>
                    <Ionicons 
                        name={currentCategory.icono || "shirt-outline"} 
                        size={40} 
                        color={COLORS.primary} 
                    />
                </View>
                <Text style={GLOBAL_STYLES.title}>{currentCategory.nombreCategoria}</Text>
            </View>

            <Text style={[GLOBAL_STYLES.text, { textAlign: 'center'}]}>
                { currentCategory.descripcion }
            </Text>

            {/* Botones de Acción */}
            <View style={styles.buttonsRow}>
                <GlobalButton
                    onPress={onEdit}
                    color="warning1"
                    style={styles.smallButton}
                    icon={<Ionicons name="create-outline" size={25} color="#fff" />}
                />
                
                <GlobalButton
                    onPress={onDelete}
                    color="danger1"
                    style={styles.smallButton}
                    icon={<Ionicons name="trash-outline" size={25} color="#fff" />}
                />
            </View>

            <GlobalButton 
                text="Añadir producto"
                onPress={() => navigation.navigate('NuevoProducto', { 
                    idCategoria: currentCategory.idCategoria,
                    nombreCategoria: currentCategory.nombreCategoria 
                })}
            />

            {/* 5. Lista de Productos */}
            <View style={styles.productsSection}>
                <Text style={[GLOBAL_STYLES.subtitle, { marginBottom: 10 }]}>
                    Productos ({categoryProducts.length})
                </Text>
                
                {isLoadingProducts ? (
                     <ActivityIndicator size="small" color={COLORS.primary} />
                ) : categoryProducts.length === 0 ? (
                    <Text style={{ color: COLORS.gray, textAlign: 'center', marginTop: 20 }}>
                        No hay productos en esta categoría.
                    </Text>
                ) : (
                    <FlatList
                        data={categoryProducts}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.idProducto.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }} // Espacio entre columnas
                        
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, width: '100%' }}
                    />
                )}
            </View>
        </LayoutSinScroll>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        backgroundColor: COLORS.secondary + '20',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 10
    },
    errorText: {
        color: COLORS.danger1,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        height: 45,
        borderRadius: 12,
    },
    productsSection: {
        marginTop: 20,
        flex: 1, // Importante para que ocupe el resto del espacio
        width: '100%'
    }
});