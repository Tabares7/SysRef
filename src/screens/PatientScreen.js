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
import { PatientItemList } from "../components/PatientItemList";

const PatientScreen = () => {
  const [referrals, setReferrals] = useState([]);
  const [referreds, setReferreds] = useState([]);

  const navigator = useNavigation();

  const route = useRoute();
  const { patient } = route.params;
  const { getReferralsByReferrer } = useReferral();
  const { getPatientById } = usePatient();

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
    setReferreds([]);
    fetchReferrals();
  }, [patient]);

  useEffect(() => {
    const fetchReferreds = async () => {
      try {
        const newReferreds = await Promise.all(
          referrals.map(async (referral) => {
            const data = await getPatientById(referral.referred_id);
            return data.patients[0];
          })
        );
        setReferreds(newReferreds);
      } catch (error) {
        console.error("Error fetching referred:", error);
      }
    };

    if (referrals.length > 0) {
      setReferreds([]);
      fetchReferreds();
    }
  }, [referrals]);

  const calcPoints = () => {
    return referrals.length * 2;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/profile_placeholder.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.referralCode}>
          Referral Code:{" "}
          <Text style={{ fontWeight: "800" }}>{patient.referral_code}</Text>
        </Text>
        <Text style={styles.email}>{patient.email}</Text>
        <Text style={styles.phone}>{patient.phone}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigator.navigate("AddReferred", { referrer: patient.id });
            }}
          >
            <Text style={styles.buttonText}>
              <AntDesign name="plus" style={{ padding: 20 }} color="white" />
              Refer a Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.buttonText}>Use Rewards</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{referrals.length}</Text>
            <Text style={styles.statLabel}>Referred</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3,648</Text>
            <Text style={styles.statLabel}>Active Points</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{calcPoints()} pts</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </View>
      {referreds.length > 0 ? (
        <SafeAreaView style={styles.body}>
          <Text style={styles.sectionTitle}>Referred Patients</Text>
          <Separator marginVertical={20} />
          <FlatList
            data={referreds}
            renderItem={({ item }) => <PatientItemList patient={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </SafeAreaView>
      ) : (
        // <SafeAreaView style={styles.body}>
        //   <Text style={styles.sectionTitle}>No Referred Patients </Text>
        //   <Text>Refer a Patient to get rewards</Text>
        // </SafeAreaView>
        <View style={styles.emptyData}>
          <Text style={styles.title}>No Referred Patients</Text>
          <Text style={styles.subtitle}>Refer a Patient to get rewards</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 0,
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
    color: "#3d3d3d",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2d22de",
  },
  name: {
    fontSize: 30,
    fontStyle: "uppercase",
    fontWeight: "bold",
    color: "#2d22de",
  },
  email: {
    fontSize: 18,
    color: "#333",
  },
  phone: {
    fontSize: 18,
    color: "#333",

    marginBottom: 20,
  },
  referralCode: {
    fontSize: 18,
    color: "#333",
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
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
    flex: 1,
  },
  sectionTitle: {
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 0,
    fontWeight: "bold",
    color: "#2d22de",
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
