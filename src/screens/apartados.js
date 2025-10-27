import React from "react";
import { View, Text } from "react-native";
import { GLOBAL_STYLES } from "../styles/globalStyles";
import Layout from "./layout";

export default function ApartadosScreen() {
    return (
        <Layout title="Apartados">
            <Text style={GLOBAL_STYLES.text}>Pantalla de Apartados</Text>
        </Layout>
    );
}