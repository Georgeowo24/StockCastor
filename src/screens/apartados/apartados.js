import React from "react";
import { View, Text } from "react-native";
import Layout from "../layout";
import { GLOBAL_STYLES } from "../../styles/globalStyles";


export default function ApartadosScreen() {
    return (
        <Layout titulo="Apartados">
            <Text style={GLOBAL_STYLES.text}>Pantalla de Apartados</Text>
        </Layout>
    );
}