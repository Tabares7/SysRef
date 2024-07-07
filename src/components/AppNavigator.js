import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';  // Asegúrate de instalar esta librería
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/authUtility';


const Tab = createBottomTabNavigator();

function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        
      }else{
        setUser(user);
        setLoading(false);
      }

    });
  });
  return (
    <Tab.Navigator
      screnOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Login') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })
      }
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={
        {
          title: user ? user : 'Bienvenido',
        }
      
      } />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />

    </Tab.Navigator>
  );
}

export default AppNavigator;
