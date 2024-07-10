import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useReferral from "../hooks/useReferral";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

const DashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [referralsThisMonth, setReferralsThisMonth] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { removeAuthData } = useAuth();

  const { getReferralsByClinicId } = useReferral();

  const fetchReferrals = async () => {
    try {
      const data = await getReferralsByClinicId();
      const filteredReferrals = filterReferralsByMonth(data.referrals);
      setReferralsThisMonth(filteredReferrals.length);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const filterReferralsByMonth = (referrals) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return referrals.filter((referral) => {
      const referralDate = new Date(referral.referral_date);
      return (
        referralDate.getMonth() + 1 === month &&
        referralDate.getFullYear() === year
      );
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReferrals();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/welcome.png")}
            style={styles.avatar}
          />
          <Text style={styles.title}>Dashboard</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>5 Symptoms of Covid-19</Text>
          <Text style={styles.cardLink}>Read More...</Text>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            <Text style={styles.chartTitle}>73.1%</Text>
            <Text style={styles.chartSubtitle}>Active Cases</Text>
          </View>
          <View style={styles.chart}>
            <Text style={styles.chartTitle}>598.3k</Text>
            <Text style={styles.chartSubtitle}>Affected</Text>
          </View>
          <View style={styles.chart}>
            <Text style={styles.chartTitle}>437.4k</Text>
            <Text style={styles.chartSubtitle}>Active Cases</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => removeAuthData()}
            style={styles.tabButton}
          >
            <Text style={styles.tabText}>Active Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Dead</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Recovered</Text>
          </TouchableOpacity>
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
    width: "100%",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardLink: {
    fontSize: 14,
    color: "#2d22de",
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
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chartSubtitle: {
    fontSize: 14,
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
    backgroundColor: "#2d22de",
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
    width: "45%",
    padding: 10,
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#2d22de",
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
