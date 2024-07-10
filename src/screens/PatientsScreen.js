import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import usePatient from "../hooks/usePatient";
import PacienteItem from "../components/PacienteItem";

import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

const PatientsScreen = () => {
  const { clinicId, token } = useAuth();
  const { getPatients } = usePatient();
  const [patients, setPatients] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    if (isFocused) {
      fetchPatients();
    }
  }, [isFocused]);

  const onRefresh = () => {
    fetchPatients();
  };

  return (
    <SafeAreaView style={styles.container}>
      {patients.length > 0 ? (
        <FlatList
          data={patients}
          renderItem={({ item }) => <PacienteItem patient={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyData}>
          <Text style={styles.title}>No patients found</Text>
          <Text style={styles.subtitle}>
            Add new patients to start working.
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPatient")}
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
    backgroundColor: "#f5f5f9", // Fondo claro para mejor contraste
  },
  listContainer: {
    paddingBottom: 20, // Espacio adicional en la parte inferior
  },
  emptyData: {
    flex: 1,
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
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
