import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const PatientItemList = ({ patient }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.referredCard}
      onPress={() => {
        navigation.navigate("PatientDetails", {
          patient,
          refresh: true,
        });
      }}
    >
      <View>
        <Text style={styles.referredName}>{patient.name}</Text>
        <Text style={styles.referredEmail}>{patient.email}</Text>
        <Text style={styles.referredPhone}>{patient.phone}</Text>
      </View>

      <Text style={styles.referredName}>+2 pts</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  referredCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    paddingRight: 30,
    margin: 10,
    backgroundColor: "#577CF0",
    shadowColor: "#000",
    borderRadius: 10,
  },
  referredName: {
    color: "#fff",

    fontSize: 22,
    fontWeight: "bold",
  },
  referredEmail: {
    color: "#fff",

    fontSize: 16,
  },
  referredPhone: {
    color: "#fff",

    fontSize: 16,
  },
});
