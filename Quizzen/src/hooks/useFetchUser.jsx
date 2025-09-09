import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useFetchUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  //   create user
  const createUser = async (userData) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/signin/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData), // Skal matche API-krav
        }
      );

      if (!response.ok) {
        throw new Error("Failed to signIn");
      }

      const data = await response.json(); // <-- parse JSON

      if (!data?.token) {
        // <-- brug data.token eller data.name.token hvis det er strukturen
        throw new Error("Token is missing");
      }

      setName(jwtDecode(data.token));
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/signin/user",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log(data); // Skal indeholde { token: "..." }
      if (!data?.token) {
        throw new Error("Token is missing");
      }
      localStorage.setItem("token", data.token);
      console.log("User data:", data);
      return data;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    fetchUserData,
    error,
    isLoading,
  };
};

export { useFetchUser };
