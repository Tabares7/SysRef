import React from "react";
import { Button, View, Text } from "react-native";
import { clearCache } from "../utils/FileSystem"; // Asegúrate de que la ruta sea correcta

const ClearCacheButton = () => {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Clear Cache" onPress={clearCache} />
    </View>
  );
};

export default ClearCacheButton;
