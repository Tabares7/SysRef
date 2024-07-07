import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";  // Importa el hook de contexto
import usePatient from "../hooks/usePatient";

const PatientsScreen = () => {
    const { clinicId, token } = useAuth();
    const { getPatients } = usePatient();
    const [patients, setPatients] = useState([]);  // Ensure the initial state is an array

    useEffect(() => {
        if (clinicId) {
            getPatients(clinicId)
                .then(data => {
                    // Check if data.patients is an array and set it to the state
                    if (data && Array.isArray(data.patients)) {
                        setPatients(data.patients);
                    } else {
                        console.error('Expected an array of patients, but got:', data);
                        setPatients([]);  // Set to an empty array if the expected array is not received
                    }
                })
                .catch(error => {
                    console.error("Error fetching patients:", error);
                    setPatients([]);  // Ensure to clear patients in case of error
                });
        }
    }, [clinicId, getPatients]);

    return (
        <View>
            <Text>Clinic ID: {clinicId || "No disponible"}</Text>
            {patients.map(patient => (
                <Text key={patient.id}>{patient.name}</Text>
            ))}
        </View>
    );
};

export default PatientsScreen;
