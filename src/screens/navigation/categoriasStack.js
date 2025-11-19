import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevaCategoria from '../categorias/nuevaCategoria';
import CategoriasScreen from '../categorias/categorias';
import InfoCategoria from '../categorias/infoCategoria';
import EditarCategoria from '../categorias/editarCategoria';
import NuevoProducto from '../categorias/productos/nuevoProducto';
import InfoProducto from '../categorias/productos/infoProducto';
import EditarProducto from '../categorias/productos/editarProducto';
const Stack = createNativeStackNavigator();

export default function CategoriasStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CategoriasMain" component={CategoriasScreen} />
            <Stack.Screen name="NuevaCategoria" component={NuevaCategoria} />
            <Stack.Screen name="InfoCategoria" component={InfoCategoria} />
            <Stack.Screen name="EditarCategoria" component={EditarCategoria} />

            <Stack.Screen name="NuevoProducto" component={NuevoProducto} />
            <Stack.Screen name="InfoProducto" component={InfoProducto} />
            <Stack.Screen name="EditarProducto" component={EditarProducto} />

        </Stack.Navigator>
    );
}
