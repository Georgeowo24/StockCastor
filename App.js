import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/styles/globalStyles';
import * as SQLite from 'expo-sqlite';

//* Base de Datos
import { SetupDatabase, DropDatabase } from './src/database/setupDatabase';


//* Pantallas principales
import InicioScreen from './src/screens/inicio';
import ProveedoresStack from './src/screens/navigation/proveedoresStack';
import ProductosStack from './src/screens/navigation/productosStack';
import VentasStack from './src/screens/navigation/ventasStack';
import ApartadosStack from './src/screens/navigation/apartadosStack';

const Tab = createBottomTabNavigator();

export default function App() {
  // Estado para saber si la BD esta lista
  const [status, setStatus] = useState('loading');

  
  useEffect(() => {
    async function SetupDatabaseAppJS () {
      try {
        //! Descomentar si quieres borrar la BD
        // await DropDatabase();

        //? Configurando la BD
        await SetupDatabase();
        setStatus('success');
      } catch ( error ) {
        console.log('❌ Error fatal al configurar la base de datos:', error)
        setStatus('error')
      }
    }
    SetupDatabaseAppJS();
  }, []);

  // Mostramos 'Loading' mientras la BD se inicializa
  if (status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.text }}>Cargando datos...</Text>
      </View>
    );
  }

  // Mostramos un error si falla
  if (status === 'error') {
      return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <Text style={{ color: COLORS.danger1, padding: 20, textAlign: 'center' }}>
          Error al cargar la base de datos. La aplicación no puede continuar.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
        translucent={false}
      />

      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight, backgroundColor: COLORS.background }} />
      )}

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 11, marginBottom: 5 },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              position: 'absolute',
              bottom: 60,
              marginHorizontal: 10,
              backgroundColor: COLORS.white,
              borderRadius: 25,
              height: 65,
              paddingBottom: 0,
              paddingTop: 5,
              ...styles.shadow,
            },
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'Proveedores') iconName = focused ? 'people' : 'people-outline';
              else if (route.name === 'Productos') iconName = focused ? 'pricetag' : 'pricetag-outline';
              else if (route.name === 'Ventas') iconName = focused ? 'cart' : 'cart-outline';
              else if (route.name === 'Apartados') iconName = focused ? 'bookmark' : 'bookmark-outline';
              return <Ionicons name={iconName} size={focused ? 30 : 28} color={COLORS.primary} />;
            },
          })}
        >
          <Tab.Screen name="Inicio" component={InicioScreen} />
          <Tab.Screen name="Proveedores" component={ProveedoresStack} />
          <Tab.Screen name="Productos" component={ProductosStack} />
          <Tab.Screen name="Ventas" component={VentasStack} />
          <Tab.Screen name="Apartados" component={ApartadosStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
});
