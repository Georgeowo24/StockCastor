import React, { useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator, Alert, FlatList } from "react-native";
import { GLOBAL_STYLES, COLORS } from "../../styles/globalStyles";
import GlobalButton from "../../components/button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCategoriesViewModel } from "../../ViewModels/categoriesViewModel";
import CategoryCard from "../../components/categorias/categoryCard";
import LayoutSinScroll from "../layoutSinScroll";

export default function CategoriasScreen() {
    const navigation = useNavigation();

    const { categories, isLoading, error, loadCategories } = useCategoriesViewModel();

    useFocusEffect(
        React.useCallback(() =>{
            loadCategories();
        },  [])
    );

    const handleCardPress = ( category ) => {
        navigation.navigate('InfoCategoria', { categoryId: category.idCategoria });
    }

    const renderCategoryCard = ({ item }) => (
        <CategoryCard
            item={item}
            onPress={() => handleCardPress(item)}
        />
    );

    if (isLoading) {
        return (
            <LayoutSinScroll titulo="Proveedores">
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            </LayoutSinScroll>
        );
    }

    if (error) {
        return (
            <LayoutSinScroll titulo="Proveedores">
                <Text style={styles.errorText}>Error al cargar proveedores: {error}</Text>
            </LayoutSinScroll>
        );
    }

    return (
        <LayoutSinScroll titulo="Categorias">
            <Text style = {GLOBAL_STYLES.text}>Consulta y administra las categorias de tus productos.</Text>

            <GlobalButton
                text={'Añadir Categoria'}
                screen={'NuevaCategoria'}
            />

            <FlatList
                data={categories}
                renderItem={renderCategoryCard}
                keyExtractor={(item) => item.idCategoria.toString()}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 180 }}
                showsVerticalScrollIndicator={false}
            />

            
        </LayoutSinScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoText: {
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.gray,
    },
    errorText: {
        color: COLORS.danger1,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
});