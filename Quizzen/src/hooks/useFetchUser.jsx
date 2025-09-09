import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useFetchUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const createUser = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to sign in (${response.status})`);
      }

      const data = await response.json();
      console.log("API response:", data);

      const token = data.token || data.accessToken || data?.user?.token;

      if (!token) {
        throw new Error("Token is missing in API response");
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setName(decoded.name || "Ukendt bruger");

      setSuccessMsg(
        "Bruger oprettet! Velkommen, " + (decoded.name || userData.name) + " 🎉"
      );

      return data;
    } catch (err) {
      console.error(err);
      setError(err);
      setSuccessMsg("Kunne ikke oprette bruger. Prøv et andet navn.");
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, error, isLoading, name, successMsg };
};

export { useFetchUser };
