import React from "react";
import { View, Text } from "react-native";
import Layout from "../layout";
import { GLOBAL_STYLES } from "../../styles/globalStyles";

export default function VentasScreen() {
    return (
        <Layout titulo="Ventas">
            <Text style={GLOBAL_STYLES.text}>Pantalla de Ventas</Text>
        </Layout>
    );
}