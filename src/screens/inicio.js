import React from "react";
import { View, Text } from "react-native";
import Layout from "./layout";
import { FONTS, GLOBAL_STYLES } from "../styles/globalStyles";

export default function InicioScreen() {
    return (
        <Layout title="Inicio">
            <Text style={FONTS.regular}>
                Bienvenido a la pantalla de inicio.  
                Aquí puedes mostrar un resumen, botones o componentes.
            </Text>

            <Text style={FONTS.regular}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
        </Layout>
    );
}
