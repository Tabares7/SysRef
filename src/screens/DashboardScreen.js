// screens/DashboardScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useReferral from "../hooks/useReferral";

const DashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [referralsThisMonth, setReferralsThisMonth] = useState([]);

  const { getReferralsByClinicId } = useReferral();

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await getReferralsByClinicId();
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    padding: 20,
  },
  section: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "blue",
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#2d22de",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    height: 150,
    width: 150,
  },
});

export default DashboardScreen;
