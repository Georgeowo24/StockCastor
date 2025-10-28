import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Layout from "../layout";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import CategoriasProductos from "../../components/productos/categoriasProductos";
import GlobalButton from "../../components/buttton";

export default function ProductosScreen() {
    return (
        <Layout titulo="Productos">
            <Text style = {GLOBAL_STYLES.text}>Consulta y administra tu inventario.</Text>

            <View style={styles.container}>
                <GlobalButton
                    text={'Añadir Productos'}
                    screen={'NuevoProducto'}
                    style={{ flex: 1, marginHorizontal: 6 }}
                />
                <GlobalButton
                    text={'Añadir Categorias'}
                    screen={'NuevaCategoria'}
                    style={{ flex: 1, marginHorizontal: 6 }}
                    color={"warning1"}
                />
            </View>

            <CategoriasProductos
                categoria={'Kessoku Band'}
            />

            <CategoriasProductos
                categoria={'Si'}
            />
            <CategoriasProductos
                categoria={'No'}
            />
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