// PacienteItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ChevronRight, Cloud, Moon, Star, Sun } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  H3,
  Paragraph,
  XStack,
  YStack,
  styled,
  Separator,
  ListItem,
} from "tamagui";
import { Pressable } from "react-native";

// Estiliza los elementos del paciente
const StyledCard = styled(Card, {
  padding: "$4",
  backgroundColor: "$background",
  shadow: "$4",
  borderRadius: "$4",
  marginBottom: "$4",
  borderWidth: 1,
  borderColor: "#ddd",
});

const InfoText = styled(Paragraph, {
  color: "#555",
  fontSize: 16,
});

const LabelText = styled(Paragraph, {
  fontWeight: "bold",
  color: "#2d22de",
  fontSize: 16,
});

const PacienteItem = ({ paciente }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={(e) => {
        navigation.navigate("Dashboard");
      }}
    >
      <StyledCard>
        <YStack padding="$2">
          <Text style={styles.title} color="#2d22de" fontSize={20}>
            {paciente.name}
          </Text>
          <Separator marginVertical={10} />
          <XStack space="$4" marginVertical="$2">
            <LabelText>Email:</LabelText>
            <InfoText>{paciente.email}</InfoText>
          </XStack>
          <XStack space="$4" marginVertical="$2">
            <LabelText>Phone:</LabelText>
            <InfoText>{paciente.phone}</InfoText>
          </XStack>
          <XStack space="$4" marginVertical="$2">
            <LabelText>Code:</LabelText>
            <InfoText>{paciente.referral_code}</InfoText>
          </XStack>
        </YStack>
      </StyledCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejor contraste
  },
  listContainer: {
    paddingBottom: 20, // Espacio adicional en la parte inferior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PacienteItem;
