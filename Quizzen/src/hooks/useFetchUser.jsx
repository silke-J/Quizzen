import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

// Hook for managing user authentication
const useFetchUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Reactive localStorage state must be declared first
  const [token, setToken] = useLocalStorage("token", null);
  const [name, setName] = useLocalStorage("username", "");

  // Login / Create user
  const createUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/api/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      )
        


      if (!response.ok)
        throw new Error(`Failed to sign in (${response.status})`);

      const data = await response.json();
      console.log("API response RAW:", data);

      // Extract token
      const receivedToken = data.token || data.accessToken || data?.user?.token;
      if (!receivedToken) throw new Error("Ingen token i API response");

      // Decode username
      let username;
      try {
        const decoded = jwtDecode(receivedToken);
        username = decoded.name || userData.name || "Ukendt bruger";
      } catch {
        username = userData.name || "Ukendt bruger";
      }

      // Store token + username reactively
      setToken(receivedToken);
      setName(username);

      setSuccessMsg(`Bruger oprettet! Velkommen, ${username} 🎉`);

      return { token: receivedToken, username };
    } catch (err) {
      setError(err.message);
      setSuccessMsg("Kunne ikke oprette bruger. Prøv et andet navn.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setName("");
    setSuccessMsg("");
    setError(null);
  };

  return {
    createUser,
    token,
    name,
    error,
    isLoading,
    successMsg,
    logout,
    setToken,
    setName,
  };
};

// Fetch wrapper that automatically reads the latest token
export const fetchWithAuth = async (url, options = {}) => {
  const authToken = window.localStorage.getItem("token"); // always latest
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(authToken
      ? {
          Authorization: `Bearer ${authToken}`,
        }
      : {}),
  };
  return fetch(url, { ...options, headers });
};

export { useFetchUser };
