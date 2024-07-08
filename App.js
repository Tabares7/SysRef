import { TamaguiProvider, createTamagui } from "@tamagui/core"; // or 'tamagui'
import tamaguiConfig from "./tamagui.config";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator"; // Asegúrate de que esta ruta sea correcta
import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#6200ee" />
          <AppNavigator />
        </NavigationContainer>
      </TamaguiProvider>
    </AuthProvider>
  );
}
