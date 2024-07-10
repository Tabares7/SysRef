import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useReferral from "../hooks/useReferral";
import useClinic from "../hooks/useClinic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { RefreshControl } from "react-native";
import usePatient from "../hooks/usePatient";

const DashboardScreen = ({ navigation }) => {
  // state constants
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [referrals, setReferrals] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [clinicInfo, setClinicInfo] = useState({});

  // media queries configuration
  const { width, height } = Dimensions.get("window");
  const isSmallScreen = width === 375;

  // custom hooks
  const { removeAuthData, token, clinicId } = useAuth();
  const { getClinicById } = useClinic();
  const { getReferralsByClinicId } = useReferral();
  const { getPatients } = usePatient();

  // default calls

  useEffect(() => {
    console.log("Dashboard Screen", clinicId, token);
    fetchReferrals();
    getPatientCount();
    getClinicInfo();
    setRefreshing(true);
    setRefreshing(false);
  }, [token]);

  // fetching values from the database
  const fetchReferrals = async () => {
    try {
      const data = await getReferralsByClinicId(clinicId);
      setReferrals(data.referrals.length);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getClinicInfo = () => {
    getClinicById()
      .then((data) => {
        setClinicInfo(data.clinic);
      })
      .catch((error) => {
        console.error("Error fetching clinic:", error);
      });
  };

  const getPatientCount = () => {
    getPatients(clinicId)
      .then((data) => {
        setPatients(data.patients);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  // functionality features
  const onRefresh = () => {
    setRefreshing(true);
    fetchReferrals();
    getPatientCount();
    getClinicInfo();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/welcome.png")}
            style={styles.avatar}
          />
          <Text>Welcome</Text>
          <Text style={styles.title}>{clinicInfo.name} </Text>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryNumber}> {referrals} </Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Referrals</Text>
            <Text
              style={
                isSmallScreen ? styles.summaryTitleSmall : styles.summaryTitle
              }
              numberOfLines={2}
            >
              That means {referrals} new patient/s thanks to your patient's
              networking.
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            <Text style={styles.summaryNumber}>{patients.length}</Text>
            <Text
              style={
                isSmallScreen ? styles.chartSubtitleSmall : styles.chartSubtitle
              }
            >
              Patients in system
            </Text>
          </View>
          <View style={styles.chart}>
            <Text style={styles.summaryNumber}>{referrals}</Text>
            <Text
              style={
                isSmallScreen ? styles.chartSubtitleSmall : styles.chartSubtitle
              }
            >
              Referred Patients
            </Text>
          </View>
          <View style={styles.chart}>
            <Text style={styles.summaryNumber}>250k</Text>
            <Text
              style={
                isSmallScreen ? styles.chartSubtitleSmall : styles.chartSubtitle
              }
            >
              Points Gained
            </Text>
          </View>
        </View>

        <View style={styles.topCountryContainer}>
          <View style={styles.countryCard}>
            <Text style={styles.countryName}>🇺🇸 USA</Text>
            <Text style={styles.countryCases}>104,256</Text>
          </View>
          <View style={styles.countryCard}>
            <Text style={styles.countryName}>🇮🇹 Italy</Text>
            <Text style={styles.countryCases}>86,498</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  summaryCard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#EFE5DF",
    borderRadius: 10,

    marginBottom: 20,
  },
  summaryNumber: { fontSize: 28, fontWeight: "bold", color: "#2d22de" },
  summaryTitle: {
    fontSize: 14,
    color: "#666",
  },
  summaryTitleSmall: {
    fontSize: 10,
    color: "#666",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d22de",
  },
  cardLink: {
    fontSize: 14,
    color: "#3E5AFA",
    marginTop: 10,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  chart: {
    width: "30%",
    height: 120,
    padding: 10,
    backgroundColor: "rgba(105, 129, 254, .2)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chartSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  chartSubtitleSmall: {
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    backgroundColor: "#3E5AFA",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  topCountryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  countryCard: {
    width: "47%",
    padding: 10,
    backgroundColor: "rgba(50, 50, 50, .2)",
    borderRadius: 10,
    alignItems: "center",
  },
  flag: {
    width: 40,
    height: 25,
    marginBottom: 10,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  countryCases: {
    fontSize: 14,
    color: "#666",
  },
  viewAllButton: {
    padding: 10,
    backgroundColor: "#3E5AFA",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  viewAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
