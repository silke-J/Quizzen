import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useFetchUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");

  //   create user
  const createUser = async (userData, e) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/signin/user",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to signIn");
      }

   
      if (!response?.name?.token) {
        throw new Error("Token is missing");
      }

      setName(jwtDecode(response.name.token));
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    createUser,
    error,
    isLoading,
  };
};

export { useFetchUser };
