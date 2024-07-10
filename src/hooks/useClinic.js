import { useCallback } from "react";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";

function useClinic() {
  const { token, clinicId } = useAuth();

  const getClinicById = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}clinics/${clinicId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch clinic");
      }
      return data;
    } catch (error) {
      console.error("Error fetching clinic:", error);
      throw error;
    }
  }, []);

  return {
    getClinicById,
  };
}
export default useClinic;
