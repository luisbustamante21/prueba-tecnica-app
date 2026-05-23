// App.tsx
import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontAwesome5 } from '@expo/vector-icons'; // <-- Importación profesional de iconos

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PlaceholderScreen = () => <View style={{ flex: 1, backgroundColor: '#F3F4F6' }} />;

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60, borderTopWidth: 0, elevation: 10 }
    }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={20} color={color} />
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color }) => <FontAwesome5 name="search" size={20} color={color} />
        }}
        // --- NUEVO CÓDIGO: Interceptamos el toque en la pestaña ---
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // 1. Prevenimos el comportamiento por defecto (que solo enfocaría la pantalla vieja)
            e.preventDefault();

            // 2. Navegamos explícitamente limpiando la categoría seleccionada
            navigation.navigate('ExploreTab', { selectedCategory: '' });
          },
        })}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color }) => <FontAwesome5 name="heart" size={20} color={color} />
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Carrito',
          tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={20} color={color} />
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen} // 2. Usa el componente real aquí
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />
        }}
      />

    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authContext.isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}