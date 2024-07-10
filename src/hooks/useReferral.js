import { useCallback } from "react";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";

function useReferral() {
  const { clinicId, token } = useAuth();

  // Crear una nueva referencia
  const createReferral = useCallback(
    async (referrerId, referredId, referralDate) => {
      try {
        const response = await fetch(`${API_URL}referrals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clinic_id: clinicId,
            referrer_id: referrerId,
            referred_id: referredId,
            referral_date: referralDate,
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to create referral:", error);
      }
    },
    [clinicId, token]
  );

  // Obtener referencias por referente
  const getReferralsByReferrer = useCallback(
    async (referrerId) => {
      try {
        const response = await fetch(
          `${API_URL}referrals/referrer/${clinicId}/${referrerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch referrals:", error);
      }
    },
    [clinicId, token]
  );

  // Actualizar una referencia
  const updateReferral = useCallback(
    async (referralId, referredId, referralDate) => {
      try {
        const response = await fetch(`${API_URL}referrals/${referralId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            referred_id: referredId,
            referral_date: referralDate,
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to update referral:", error);
      }
    },
    [token]
  );

  // Eliminar una referencia
  const deleteReferral = useCallback(
    async (referralId) => {
      try {
        const response = await fetch(`${API_URL}referrals/${referralId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to delete referral:", error);
      }
    },
    [token]
  );

  const getReferralsByClinicId = useCallback(
    async (clinicId) => {
      try {
        const response = await fetch(`${API_URL}referrals/${clinicId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Failed to fetch referrals", error);
      }
    },
    [token]
  );

  return {
    getReferralsByClinicId,
    createReferral,
    getReferralsByReferrer,
    updateReferral,
    deleteReferral,
  };
}

export default useReferral;
