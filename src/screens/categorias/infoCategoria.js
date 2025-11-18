// En: infoCategoria.js
import React from "react";
import { Text, StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { GLOBAL_STYLES, COLORS } from "../../styles/globalStyles";
import GlobalButton from "../../components/button";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import LayoutSinScroll from "../layoutSinScroll";
import { Ionicons } from "@expo/vector-icons";

export default function InfoCategoria () {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryId } = route.params; 

    const { 
        currentCategory, 
        isLoading, 
        error, 
        loadCategoryDetails, 
        handleDeleteCategory 
    } = useCategoriesViewModel();

    useFocusEffect(
        React.useCallback(() => {
            if (categoryId) {
                loadCategoryDetails(categoryId);
            }
        }, [categoryId])
    );

    const onDelete = () => {
        Alert.alert(
            "Eliminar Categoría",
            `¿Estás seguro de que deseas eliminar la categoría "${currentCategory.nombreCategoria}"? Esta acción no se puede deshacer.`,
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

    if (isLoading && !currentCategory) {
        return (
            <LayoutSinScroll titulo="Cargando...">
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            </LayoutSinScroll>
        );
    }

    if (error) {
        return (
            <LayoutSinScroll titulo="Error">
                <Text style={styles.errorText}>Error al cargar la categoría: {error}</Text>
                <GlobalButton text="Volver" onPress={() => navigation.goBack()} color="secondary" />
            </LayoutSinScroll>
        );
    }

    if (!currentCategory) {
        return (
            <LayoutSinScroll titulo="No Encontrado">
                <Text style={styles.infoText}>No se encontró la categoría.</Text>
                <GlobalButton text="Volver" onPress={() => navigation.goBack()} color="secondary" />
            </LayoutSinScroll>
        );
    }


    return (
        <LayoutSinScroll>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <View style={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: 40, 
                        backgroundColor: COLORS.secondary + '20',
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}>
                        <Ionicons 
                            name={currentCategory.icono || "shirt-outline"} 
                            size={40} 
                            color={COLORS.primary} 
                        />
                    </View>
                    
                    <Text style={GLOBAL_STYLES.title}>{currentCategory.nombreCategoria}</Text>
                </View>

                <Text style={GLOBAL_STYLES.text}>{ currentCategory.descripcion }</Text>

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

                />
        </LayoutSinScroll>
    );
}

const styles = StyleSheet.create({
    errorText: {
        color: COLORS.danger1,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    infoText: {
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.gray,
        fontSize: 16,
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        height: 45,
        borderRadius: 12,
    },
});