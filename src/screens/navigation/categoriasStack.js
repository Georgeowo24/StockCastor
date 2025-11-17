import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevaCategoria from '../categorias/nuevaCategoria';
import CategoriasScreen from '../categorias/categorias';
import InfoCategoria from '../categorias/infoCategoria';
import EditarCategoria from '../categorias/editarCategoria';

const Stack = createNativeStackNavigator();

export default function CategoriasStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CategoriasMain" component={CategoriasScreen} />
            <Stack.Screen name="NuevaCategoria" component={NuevaCategoria} />
            <Stack.Screen name="InfoCategoria" component={InfoCategoria} />
            <Stack.Screen name="EditarCategoria" component={EditarCategoria} />
        </Stack.Navigator>
    );
}
