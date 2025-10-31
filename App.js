import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/styles/globalStyles';
import * as SQLite from 'expo-sqlite';

// Base de Datos
import { openDatabase } from './src/database/openDB';
import { initDatabase } from './src/database/initTables';
import { createIndexes } from './src/database/createIndexes';

// Pantallas principales
import InicioScreen from './src/screens/inicio';
import VentasScreen from './src/screens/ventas/ventas';
import ApartadosScreen from './src/screens/apartados/apartados';
import ProductosStack from './src/navigation/productosStack';

const Tab = createBottomTabNavigator();

export default function App() {
  const [status, setStatus] = useState('loading');
      
  useEffect(() => {
  async function setupDatabase() {
      try {
        // const dbName = "StockCastor.db"
        // console.log(`🧨 Borrando base de datos antigua: ${dbName}...`);
        // await SQLite.deleteDatabaseAsync(dbName);
        // console.log('🗑️ Base de datos eliminada.');

        console.log('📂 Abriendo base de datos...');
        const db = await openDatabase();

        console.log('⚙️ Inicializando tablas...');
        await initDatabase(db);
        
        console.log('Creando indices...'); 
        await createIndexes(db);

        console.log('✅ Todas las tablas fueron creadas correctamente');
        setStatus('success');
        }catch(error){
        console.error('❌ Error al crear tablas:', error);
        setStatus('error');
      }
    }
    setupDatabase();
  }, []);

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
              bottom: 45,
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
              else if (route.name === 'Productos') iconName = focused ? 'pricetag' : 'pricetag-outline';
              else if (route.name === 'Ventas') iconName = focused ? 'cart' : 'cart-outline';
              else if (route.name === 'Apartados') iconName = focused ? 'bookmark' : 'bookmark-outline';
              return <Ionicons name={iconName} size={focused ? 30 : 28} color={COLORS.primary} />;
            },
          })}
        >
          <Tab.Screen name="Inicio" component={InicioScreen} />
          <Tab.Screen name="Productos" component={ProductosStack} />
          <Tab.Screen name="Ventas" component={VentasScreen} />
          <Tab.Screen name="Apartados" component={ApartadosScreen} />
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
