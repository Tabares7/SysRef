import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Importa el ícono correcto
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { getUser } from '../utils/authUtility';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        setLoading(false);
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null; // Puedes mostrar un indicador de carga mientras se obtiene el usuario
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? '#2d22de' : '#8e8e93';
          let iconPadding = focused ? 10 : 5;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Login') {
            iconName = 'user';
          } else if (route.name === 'Register') {
            iconName = 'adduser';
          }

          return (
            <AntDesign
              name={iconName}
              size={size}
              color={iconColor}
              style={{ padding: iconPadding }}
            />
          );
        },
        tabBarActiveTintColor: '#2d22de',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          height: 100, // Ajusta la altura de la barra de pestañas
          // paddingBottom: 20, // Ajusta el padding inferior
          paddingTop: 10, // Ajusta el padding superior
        },
        tabBarLabelStyle: {
          marginTop: 0,
          fontSize: 16, // Ajusta el tamaño de la etiqueta
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Login" component={LoginScreen} options={{ title: "Login" }}/>
      <Tab.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }}/>
    </Tab.Navigator>
  );
}

export default AppNavigator;
