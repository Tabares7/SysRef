// PatientsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import usePatient from "../hooks/usePatient";
import PacienteItem from "../components/PacienteItem";

const PatientsScreen = () => {
  const { clinicId, token } = useAuth();
  const { getPatients } = usePatient();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={patients}
        renderItem={({ item }) => <PacienteItem paciente={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejor contraste
  },
  listContainer: {
    paddingBottom: 20, // Espacio adicional en la parte inferior
    padding: 20,
  },
});

export default PatientsScreen;
