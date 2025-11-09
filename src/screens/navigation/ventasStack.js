import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VentasScreen from "../ventas/ventas";

const Stack = createNativeStackNavigator();

export default function VentasStack () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="VentasMain" component={VentasScreen} />
        </Stack.Navigator>
    );
}