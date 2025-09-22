import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importando las paginas principales
import InicioScreen from './src/screens/Inicio';
import ProductosScreen from './src/screens/Productos';
import ApartadosScreen from './src/screens/Apartados';
import VentasScreen from './src/screens/Ventas';

const Tab = createBottomTabNavigator();

function TabNavigator ( ) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 60,
          ...styles.shadow,
        },
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

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#5FC9B4',
        tabBarInactiveTintColor: 'gray',
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
