import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/styles/globalStyles';

// TabNavigator
import InicioScreen from './src/screens/inicio';
import ProductosScreen from './src/screens/productos';
import VentasScreen from './src/screens/ventas';
import ApartadosScreen from './src/screens/apartados';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true, 
        tabBarLabelStyle: { fontSize: 11, marginBottom: 5 },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',

        // Estilos de la barra flotante
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
        
        // Definición del ícono
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Productos') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Ventas') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Apartados') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={focused ? 30 : 28} color={COLORS.primary} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Ventas" component={VentasScreen} />
      <Tab.Screen name="Apartados" component={ApartadosScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
      <StatusBar style="auto" /> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15, 
    shadowRadius: 10, 
    elevation: 8, 
  }
});