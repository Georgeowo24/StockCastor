import React, { useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Layout from "../layout";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import CategoriasProductos from "../../components/productos/categoriasProductos";
import GlobalButton from "../../components/buttton";
import { useProductViewModel } from "../../ViewModels/productViewModel";
import { useFocusEffect } from "@react-navigation/native";

export default function ProductosScreen() {
    const { products, reloadProducts, isLoading, error } = useProductViewModel();

    useFocusEffect(
        React.useCallback(() => {
            reloadProducts();
        }, [])
    );

    if (isLoading) {
        return (
            <Layout titulo="Productos">
                <ActivityIndicator size="large" color="#000" />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout titulo="Productos">
                <Text style={{ color: "red" }}>{error}</Text>
            </Layout>
        );
    }

    return (
        <Layout titulo="Productos">
            <Text style = {GLOBAL_STYLES.text}>Consulta y administra tu inventario.</Text>

            <View style={styles.container}>
                <GlobalButton
                    text={'Añadir Proveedor'}
                    screen={'NuevoProveedor'}
                    style={{ flex: 1, marginHorizontal: 6 }}
                    color="success1"
                />
                <GlobalButton
                    text={'Añadir Categoria'}
                    screen={'NuevaCategoria'}
                    style={{ flex: 1, marginHorizontal: 6 }}
                    color="warning1"
                />
            </View>

            <GlobalButton
                text={'Añadir Producto'}
                screen={'NuevoProducto'}
            />


            { products.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>No hay productos registrados.</Text>
            ) : (
                products.map(({ categoria, productos }) => (
                    <CategoriasProductos
                        key={categoria}
                        categoria={categoria}
                        productos={productos}
                    />
                ))
            )}
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});