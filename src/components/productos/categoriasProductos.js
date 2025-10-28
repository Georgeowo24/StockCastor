import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, GLOBAL_STYLES } from "../../styles/globalStyles";
import CardProductos from "./cardProductos";

export default function CategoriasProductos ({ categoria }) {
    return (
        <View >
            <Text style={ GLOBAL_STYLES.subtitle }>{ categoria }</Text>
            <View style={{ height: 320, marginBottom: 10 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{padding: 5}}
                >
                    <CardProductos
                        nombre={"Hitori Gotō"}
                        precio={80}
                        stock={2}
                        imagen={"https://statics.ruadoll.com/image/cache/2023/1117/0/cb4ac23e-88d1-6e41-4a47-8a3746d89e61-1000x1000.jpg"}
                    />
                    <CardProductos
                        nombre={"Ryo Yamada"}
                        precio={80}
                        stock={2}
                        imagen={"https://i.pinimg.com/736x/bb/5c/27/bb5c27af55406383f2fb2a782e4409e7.jpg"}
                    />
                    <CardProductos
                        nombre={"Kita Ikuyo"}
                        precio={80}
                        stock={2}
                        imagen={"https://cdn.rafled.com/anime-icons/images/Dh1k8bwPQjp3JaXhsv7pnLzrCgSt54x6.jpg"}
                    />
                    <CardProductos
                        nombre={"Nijika Ijichi"}
                        precio={80}
                        stock={2}
                        imagen={"https://i.pinimg.com/736x/e6/8b/cf/e68bcf80d15ff76b858729b144a9d8fa.jpg"}
                    />
                </ScrollView>
            </View>
        </View>
    );
}