import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { storeToken } from "../utils/authUtility";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.8:5000/api/clinics/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, password }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        await storeToken(data.token);
        navigation.navigate("Login");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="Clinic Name"
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
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
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#3E5AFA",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: "#3E5AFA",
  },
});

export default RegisterScreen;
