import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import usePatient from "../hooks/usePatient";
import useReferral from "../hooks/useReferral";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { formatDate } from "../utils/formatDate";

const AddReferredScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referrerData, setReferrerData] = useState({});

  const [newPatientId, setNewPatientId] = useState();

  const [error, setError] = useState("");
  const { addPatient, getPatientById } = usePatient();
  const { createReferral } = useReferral();
  const navigation = useNavigation();
  const route = useRoute();
  const { referrer } = route.params;

  useEffect(() => {
    setError("");
    const getReferrer = async () => {
      try {
        const res = await getPatientById(referrer);
        setReferrerData(res.patients[0]);
      } catch (error) {
        console.error("Error getting referrer:", error);
      }
    };

    getReferrer();
  }, []);

  useEffect(() => {
    const newReferral = async () => {
      try {
        const res = await createReferral(
          referrer,
          newPatientId,
          formatDate(new Date())
        );
        if (res.message === "Referral created successfully") {
          navigation.navigate("PatientDetails", { patient: referrerData });
        }
      } catch (error) {
        console.error("Error creating referral:", error);
      }
    };
    newReferral();
  }, [newPatientId]);

  const validateFields = () => {
    setError("");
    if (!name || !email || !phone) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const res = await addPatient({ name, email, phone });
        setNewPatientId(res.patientId);
      } catch (error) {
        setError("Error adding patient: " + error.message);
      }
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

export default AddReferredScreen;
