import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductosScreen from '../productos/productos';
import NuevoProducto from '../productos/nuevoProducto';
import NuevaCategoria from '../productos/nuevaCategoria';
import NuevoProveedor from '../productos/nuevoProveedor';

const Stack = createNativeStackNavigator();

export default function ProductosStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProductosMain" component={ProductosScreen} />
            <Stack.Screen name="NuevoProducto" component={NuevoProducto} />
            <Stack.Screen name="NuevaCategoria" component={NuevaCategoria} />
            <Stack.Screen name="NuevoProveedor" component={NuevoProveedor} />
        </Stack.Navigator>
    );
}
