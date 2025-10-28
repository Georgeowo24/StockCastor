import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { COLORS, SIZES } from "../../styles/globalStyles";

export function GraficaSemanal() {
    const screenWidth = Dimensions.get("window").width;

    const data = [
        {
        name: "Lunes",
        ventas: 200,
        color: "#34C759",
        legendFontColor: COLORS.text,
        legendFontSize: 12,
        },
        {
        name: "Martes",
        ventas: 300,
        color: "#5FC9B4",
        legendFontColor: COLORS.text,
        legendFontSize: 12,
        },
        {
        name: "Miércoles",
        ventas: 150,
        color: "#007AFF",
        legendFontColor: COLORS.text,
        legendFontSize: 12,
        },
        {
        name: "Jueves",
        ventas: 250,
        color: "#FF9500",
        legendFontColor: COLORS.text,
        legendFontSize: 12,
        },
        {
        name: "Viernes",
        ventas: 400,
        color: "#DC2626",
        legendFontColor: COLORS.text,
        legendFontSize: 12,
        },
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Ventas de la Semana</Text>
            <PieChart
                data={data.map(d => ({
                name: d.name,
                population: d.ventas,
                color: d.color,
                legendFontColor: d.legendFontColor,
                legendFontSize: d.legendFontSize,
                }))}
                width={screenWidth - 60}
                height={220}
                chartConfig={{
                backgroundColor: COLORS.white,
                backgroundGradientFrom: COLORS.white,
                backgroundGradientTo: COLORS.white,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 10,
    },
});