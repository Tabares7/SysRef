import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useReferral from "../hooks/useReferral";

const PacienteItem = ({ patient }) => {
  const navigation = useNavigation();
  const { getReferralsByReferrer } = useReferral();
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await getReferralsByReferrer(patient.id);
        setReferrals(data.referrals);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    setReferrals([]);
    fetchReferrals();
  }, [patient]);

  return (
    <TouchableOpacity
      style={styles.cardCard}
      onPress={() => {
        navigation.navigate("PatientDetails", {
          patient,
          refresh: true,
        });
      }}
    >
      <View>
        <Text style={styles.cardName}>{patient.name}</Text>
        <Text style={styles.cardEmail}>{patient.email}</Text>
        <Text style={styles.cardPhone}>{patient.phone}</Text>
      </View>
      <View style={styles.cardQuantityCOntainer}>
        <Text style={styles.cardsQuantity}>{referrals.length}</Text>
        <Text style={styles.cardEmail}>Referreds</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardCard: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    paddingRight: 30,
    margin: 10,
    backgroundColor: "#577CF0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardName: {
    color: "#fff",

    fontSize: 22,
    fontWeight: "bold",
  },
  cardEmail: {
    color: "#fff",

    fontSize: 16,
  },
  cardPhone: {
    color: "#fff",

    fontSize: 16,
  },
  cardsQuantity: {
    color: "#fff",

    fontSize: 30,
    fontWeight: "bold",
  },
  cardQuantityCOntainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PacienteItem;
