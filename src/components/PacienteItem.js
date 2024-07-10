import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, XStack, YStack, Separator, styled } from "tamagui";

// Estiliza los elementos del patient
const StyledCard = styled(Card, {
  padding: "$4",
  backgroundColor: "$background",
  shadow: "$4",
  borderRadius: "$4",
  marginBottom: "$4",
  borderWidth: 1,
  borderColor: "#ddd",
});

const InfoText = styled(Text, {
  color: "#555",
  fontSize: 16,
});

const LabelText = styled(Text, {
  fontWeight: "bold",
  color: "#3E5AFA",
  fontSize: 16,
});

const PacienteItem = ({ patient }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PatientDetails", { patient });
      }}
    >
      <StyledCard style={styles.container}>
        <YStack padding="$1">
          <Text style={styles.name}>{patient.name}</Text>
          <Separator marginVertical={10} />
          <XStack space="$4" marginVertical="$2">
            <LabelText>Email:</LabelText>
            <InfoText>{patient.email}</InfoText>
          </XStack>
          <XStack space="$4" marginVertical="$2">
            <LabelText>Phone:</LabelText>
            <InfoText>{patient.phone}</InfoText>
          </XStack>
          <XStack space="$4" marginVertical="$2">
            <LabelText>Code:</LabelText>
            <InfoText>{patient.referral_code}</InfoText>
          </XStack>
        </YStack>
      </StyledCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3E5AFA",
  },
});

export default PacienteItem;
