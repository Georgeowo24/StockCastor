import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProveedoresScreen from '../proveedores/proveedores';
import NuevoProveedor from '../proveedores/nuevoProveedor';
import EditarProveedor from '../proveedores/editarProveedor';



const Stack = createNativeStackNavigator();

export default function ProveedoresStack () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name = "ProveedoresMain" component={ProveedoresScreen}/>
            <Stack.Screen name = "NuevoProveedor" component={NuevoProveedor}/>
            <Stack.Screen name = "EditarProveedor" component={EditarProveedor}/>
        </Stack.Navigator>
    );
}