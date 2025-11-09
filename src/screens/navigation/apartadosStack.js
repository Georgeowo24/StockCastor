import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApartadosScreen from "../apartados/apartados";

const Stack = createNativeStackNavigator();

export default function ApartadosStack () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ApartadosMain" component={ApartadosScreen} />
        </Stack.Navigator>
    );
}