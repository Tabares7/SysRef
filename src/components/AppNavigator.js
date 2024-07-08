import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PatientsScreen from "../screens/PatientsScreen";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import AddPatientScreen from "../screens/AddPatientScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { token, loading } = useAuth();

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
          height: 100,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          marginTop: 0,
          fontSize: 16,
        },
      })}
    >
      {token ? (
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

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{ title: "Add New Patient" }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
