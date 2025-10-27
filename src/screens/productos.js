import React from "react";
import { View, Text } from "react-native";
import Layout from "./layout";
import { GLOBAL_STYLES } from "../styles/globalStyles";

export default function ProductosScreen() {
    return (
        <Layout titulo="Productos">
            <Text style = {GLOBAL_STYLES.text}>Pantalla de Productos</Text>
        </Layout>
    );
}