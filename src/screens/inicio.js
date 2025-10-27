import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "./layout";
import { GLOBAL_STYLES, SIZES } from "../styles/globalStyles";

// Componentes
import { AlertaStock } from "../components/Inicio/alertaStock";
import { CardPedidos } from "../components/Inicio/cardPedidos";
import { CardVentas } from "../components/Inicio/cardVentas"
import { GraficaSemanal } from "../components/Inicio/graficaSemanal";
import { ProductoEstrella } from "../components/Inicio/productoEstrella";

export default function InicioScreen() {
    return (
        <Layout titulo="Inicio">
            <Text style={GLOBAL_STYLES.text}>
                Bienvenido al sistema Stock Castor.  
            </Text>

            {/* Alertas */}
            <AlertaStock 
                type={'success'}
                title={'Stock OK'}
                description={'Todos los productos tienen niveles de stock saludables. ¡Buen trabajo!'}
            />

            {/* Cards */}
            <View style={styles.container}>
                <CardVentas 
                    ventas={100.50}
                />
                <CardPedidos
                    pedidos={8}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <GraficaSemanal />

                <ProductoEstrella nombre="Omnitrix" unidades={80}/>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.large,
    },
});