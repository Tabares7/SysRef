import { useCallback } from "react";
import { API_URL } from "@env"; // Asegúrate de tener la variable de entorno API_URL configurada
import { useAuth } from "../context/AuthContext";

function usePatient() {
  const { clinicId, token } = useAuth(); // Usa clinicId directamente desde el contexto
  // Función para añadir un nuevo paciente
  const addPatient = useCallback(async (patientData) => {
    try {
      const response = await fetch(`${API_URL}patients/${clinicId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to add patient");
      }
      return data;
    } catch (error) {
      console.error("Error adding patient:", error);
      throw error;
    }
  }, []);

  // Función para obtener la lista de pacientes
  const getPatients = useCallback(async (clinicId) => {
    try {
      console.log("Fetching");
      const response = await fetch(`${API_URL}patients/${clinicId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch patients");
      }
      return data;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }, []);

  // Función para actualizar un paciente
  const updatePatient = useCallback(async (patientId, patientData) => {
    try {
      const response = await fetch(
        `${API_URL}patients/${clinicId}/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patientData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to update patient");
      }
      return data;
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  }, []);

  // Función para eliminar un paciente
  const deletePatient = useCallback(async (patientId) => {
    try {
      const response = await fetch(
        `${API_URL}patients/${clinicId}/${patientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to delete patient");
      }
      return data;
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  }, []);

  return {
    addPatient,
    getPatients,
    updatePatient,
    deletePatient,
  };
}

export default usePatient;
