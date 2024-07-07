// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/components/AppNavigator'; // Asegúrate de que esta ruta sea correcta

// const App = () => {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

import { TamaguiProvider, createTamagui } from '@tamagui/core'; // or 'tamagui'
import tamaguiConfig from './tamagui.config';
// you usually export this from a tamagui.config.ts file
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator'; // Asegúrate de que esta ruta sea correcta


export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </TamaguiProvider>
  );
}
