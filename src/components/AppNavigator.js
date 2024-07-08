import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign"; // Importa el ícono correcto
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PatientsScreen from "../screens/PatientsScreen";
import { getUser } from "../utils/authUtility";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { token, loading } = useAuth(); // Obtén el token y el estado de carga del contexto

  if (loading) {
    return null; // Puedes mostrar un indicador de carga mientras se obtienen los datos de autenticación
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#2d22de" : "#8e8e93";
          let iconPadding = focused ? 10 : 5;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Login") {
            iconName = "user";
          } else if (route.name === "Register") {
            iconName = "adduser";
          } else if (route.name === "Patients") {
            iconName = "team";
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
        tabBarActiveTintColor: "#2d22de",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          height: 100, // Ajusta la altura de la barra de pestañas
          paddingTop: 10, // Ajusta el padding superior
        },
        tabBarLabelStyle: {
          marginTop: 0,
          fontSize: 16, // Ajusta el tamaño de la etiqueta
        },
      })}
    >
      {loading ? (
        <>
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="Patients"
            component={PatientsScreen}
            options={{ title: "Patients" }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default AppNavigator;
