import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import usePatient from "../hooks/usePatient";
import PacienteItem from "../components/PacienteItem";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const PatientsScreen = () => {
  const { clinicId, token } = useAuth();
  const { getPatients } = usePatient();
  const [patients, setPatients] = useState([]);
  const navigation = useNavigation();

  const fetchPatients = useCallback(() => {
    if (clinicId) {
      getPatients(clinicId)
        .then((data) => {
          if (data && Array.isArray(data.patients)) {
            setPatients(data.patients);
          } else {
            console.error("Expected an array of patients, but got:", data);
            setPatients([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
          setPatients([]);
        });
    }
  }, [clinicId, getPatients]);

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [fetchPatients])
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={patients}
        renderItem={({ item }) => <PacienteItem patient={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AddPatient", { onAdd: fetchPatients })
          }
        >
          <Text style={styles.buttonText}>Add New Patient</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejor contraste
  },
  listContainer: {
    paddingBottom: 20, // Espacio adicional en la parte inferior
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    padding: 10,
  },
  button: {
    backgroundColor: "#2d22de",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PatientsScreen;
