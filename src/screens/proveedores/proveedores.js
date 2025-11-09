import React from "react";
import { View, Text } from "react-native";
import Layout from "../layout";
import { GLOBAL_STYLES } from "../../styles/globalStyles";

export default function ProveedoresScreen () {
    return (
        <Layout titulo="Proveedores">
            <Text style={GLOBAL_STYLES.text}>Pantalla de Proveedores </Text>
        </Layout>
    )
}