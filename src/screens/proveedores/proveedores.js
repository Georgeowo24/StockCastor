import React from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import GlobalButton from "../../components/button";
import { useProvidersViewModel } from "../../ViewModels/providersViewModel";
import CardProveedores from "../../components/proveedores/cardProveedores";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LayoutSinScroll from "../layoutSinScroll";

export default function ProveedoresScreen () {
    const navigation = useNavigation();
    const { providers, isLoading, error, handleDeleteProvider, loadAllProviders } = useProvidersViewModel();
    
    // Recarga los datos
    useFocusEffect(
        React.useCallback(() => {
            loadAllProviders();
        }, [])
    );

    const handleEditPress = (provider) => {
        navigation.navigate('EditarProveedor', { provider: provider });
    };

    const handleDeletePress = (id) => {
        Alert.alert(
            "Eliminar Proveedor",
            "¿Estás seguro de que deseas eliminar este proveedor?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    onPress: () => handleDeleteProvider(id), 
                    style: "destructive" 
                }
            ]
        );
    };

    const renderProviderCard = ({ item }) => (
        <CardProveedores
            nombre={item.nombreProveedor}
            telefono={item.telefono}
            direccion={item.direccion}
            onEdit={() => handleEditPress(item)}
            onDelete={() => handleDeletePress(item.idProveedor)}
        />
    );

    // Muestra un indicador de carga
    if (isLoading) {
        return (
            <LayoutSinScroll titulo="Proveedores">
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            </LayoutSinScroll>
        );
    }

    // Muestra un mensaje de error si algo falló
    if (error) {
        return (
            <LayoutSinScroll titulo="Proveedores">
                <Text style={styles.errorText}>Error al cargar proveedores: {error}</Text>
            </LayoutSinScroll>
        );
    }
    

    return (
        <LayoutSinScroll titulo="Proveedores">
            <Text style={GLOBAL_STYLES.text}>Pantalla de Proveedores </Text>

            <GlobalButton
                text={'Añadir Proveedor'}
                screen={'NuevoProveedor'}
            />

            <FlatList
                data={providers}
                renderItem={renderProviderCard}
                keyExtractor={(item) => item.idProveedor.toString()}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 180 }}
                showsVerticalScrollIndicator={false}

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay proveedores registrados.</Text>
                    </View>
                }
            />

        </LayoutSinScroll>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        fontSize: 16,
        color: "#666"
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20
    }
});