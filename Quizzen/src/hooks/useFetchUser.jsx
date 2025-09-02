import { useState } from "react";

const useFetchUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   create user
  const createUser = async (userData) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Fejl ved oprettelse af user");
      }

      const result = await response.json();
      return result;

   

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
