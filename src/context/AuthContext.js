import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  // Script para leer el valor almacenado en AsyncStorage

  

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        // Cargar el token y el clinicId del almacenamiento
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedClinicId = await AsyncStorage.getItem("clinicId");
        if (storedToken) {
          setToken(storedToken);
        }
        if (storedClinicId) {
          setClinicId(storedClinicId);
        }
      } catch (error) {
        console.error("Error loading auth data", error);
      }
    };

    loadAuthData();
  }, []);

  const storeToken = async (newToken) => {
    try {
      await AsyncStorage.setItem("authToken", newToken);
      setToken(newToken); // Actualizar el estado con el nuevo token
      console.log("Token stored successfully"); // Confirmación de éxito
    } catch (error) {
      console.error("Error saving token", error); // Detalles del error
    }
  };
  
  const storeClinicId = async (newClinicId) => {
    const clinicIdString = String(newClinicId);
    try {
      await AsyncStorage.setItem("clinicId", clinicIdString);
      setClinicId(newClinicId); // Actualizar el estado con el nuevo clinicId
      console.log("Clinic ID stored successfully"); // Confirmación de éxito
    } catch (error) {
      console.error("Error saving clinicId", error); // Detalles del error
    }
  };

  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("clinicId");
      setToken(null); // Eliminar el token del estado
      setClinicId(null); // Eliminar el clinicId del estado
    } catch (error) {
      console.error("Error removing auth data", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        clinicId,
        storeToken,
        storeClinicId,
        removeAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
