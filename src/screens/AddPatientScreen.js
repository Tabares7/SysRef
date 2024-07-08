import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import usePatient from "../hooks/usePatient";
import { useNavigation } from "@react-navigation/native";

const AddPatientScreen = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { addPatient } = usePatient();
  const navigation = useNavigation();

  const validateFields = () => {
    if (!name) {
      return false;
    }
    if (!email) {
      return false;
    }
    if (!phone) {
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateFields()) {
      const response = addPatient({ name, email, phone });
      if (response) {
        navigation.navigate("Patients");
      }
    } else {
      setError("Error adding patient, some values are missing.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Patient</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={setReferralCode}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "#2d22de",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export default AddPatientScreen;
