import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export const ConfigScreen = () => {
  const { removeAuthData } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.emptyData}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => removeAuthData()}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    padding: 10,
  },
  button: {
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
