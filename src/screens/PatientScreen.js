import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { ButtonIcon, Separator } from "tamagui";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useReferral from "../hooks/useReferral";
import usePatient from "../hooks/usePatient";
import PacienteItem from "../components/PacienteItem";
import { useNavigation } from "@react-navigation/native";

const PatientScreen = () => {
  const [referrals, setReferrals] = useState([]);
  const [referreds, setReferreds] = useState([]);

  const navigator = useNavigation();

  const route = useRoute();
  const { patient } = route.params;
  const { getReferralsByReferrer } = useReferral();
  const { getPatientById } = usePatient();

  useEffect(() => {
    getReferralsByReferrer(patient.id)
      .then((data) => {
        setReferrals(data.referrals);
        console.log("Referrals:", data.referrals);
      })
      .catch((error) => {
        console.error("Error fetching referrals:", error);
      });
  }, []);

  useEffect(() => {
    referrals.forEach((referral) => {
      getPatientById(referral.referred_id)
        .then((data) => {
          setReferreds(data.patients);
          console.log("Referred:", referreds);
        })
        .catch((error) => {
          console.error("Error fetching referred:", error);
        });
    });
  }, [referrals]);

  // const renderReferredPatient = ({ item }) => (
  //   <View style={styles.referredCard}>
  //     <Text style={styles.referredName}>{item.name}</Text>
  //     <Text style={styles.referredEmail}>{item.email}</Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/profile_placeholder.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.email}>{patient.email}</Text>
        <Text style={styles.phone}>{patient.phone}</Text>
        <Text style={styles.referralCode}>
          Referral Code: {patient.referral_code}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigator.navigate("AddReferred", { referrer: patient.id });
            }}
          >
            <Text style={styles.buttonText}>
              <AntDesign name="plus" style={{ padding: 20 }} color="white" />
              Refer a patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.buttonText}>Use rewards</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{referrals.length}</Text>
            <Text style={styles.statLabel}>Referred</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3,648</Text>
            <Text style={styles.statLabel}>Content</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3.6m</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Referred Patients</Text>
        <Separator marginVertical={10} />
        <FlatList
          data={referreds}
          renderItem={({ item }) => <PacienteItem patient={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 0,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d22de",
  },
  email: {
    fontSize: 16,
    color: "#333",
  },
  phone: {
    fontSize: 16,
    color: "#333",
  },
  referralCode: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2d22de",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  followButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
  },
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  referredCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  referredName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  referredEmail: {
    fontSize: 16,
    color: "#666",
  },
});

export default PatientScreen;
