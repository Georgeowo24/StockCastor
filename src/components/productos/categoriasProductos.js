import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, GLOBAL_STYLES } from "../../styles/globalStyles";
import CardProductos from "./cardProductos";

export default function CategoriasProductos ({ categoria, productos }) {
    return (
        <View >
            <Text style={ GLOBAL_STYLES.subtitle }>{ categoria }</Text>
            <View style={{ height: 320, marginBottom: 10 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{padding: 5}}
                >
                    {productos.map((producto) => 
                        <CardProductos
                            key={producto.idProducto}
                            nombre={producto.nombreProducto}
                            precio={producto.precioVenta}
                            stock={producto.stockActual}
                            imagen={producto.imagen}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}