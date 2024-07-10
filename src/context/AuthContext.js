import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading auth token", error);
      }
    };

    const loadClinicId = async () => {
      try {
        const storedClinicId = await AsyncStorage.getItem("clinicId");
        if (storedClinicId) {
          setClinicId(storedClinicId);
        }
      } catch (error) {
        console.error("Error loading clinic ID", error);
      }
    };

    const loadAuthData = async () => {
      try {
        await loadAuthToken();
        await loadClinicId();
      } catch (error) {
        console.error("Error loading auth data", error);
      } finally {
        setLoading(false); // Carga completada
      }
    };

    loadAuthData();
  }, []);

  const storeToken = async (newToken) => {
    try {
      await AsyncStorage.setItem("authToken", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error saving token", error);
    }
  };

  const storeClinicId = async (newClinicId) => {
    const clinicIdString = String(newClinicId);
    try {
      await AsyncStorage.setItem("clinicId", clinicIdString);
      setClinicId(newClinicId);
    } catch (error) {
      console.error("Error saving clinicId", error);
    }
  };

  const removeAuthData = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("clinicId");
      setToken(null);
      setClinicId(null);
      console.log("Auth data removed");
    } catch (error) {
      console.error("Error removing auth data", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        clinicId,
        loading, // Incluir estado de carga
        storeToken,
        storeClinicId,
        removeAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
