import { useState } from "react";

const useFetchCount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitAnswer = async (optionId) => {
    setIsLoading(true);
    setError(null);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID mangler i localStorage");
      setIsLoading(false);
      return;
    }

    if (!optionId) {
      setError("Option ID mangler");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/quiz/68b69fb8bdc505969f25ff2c/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, optionId }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! ${response.status}: ${text}`);
      }

      const result = await response.json();

 

      return result;
    } catch (err) {
      setError(err.message);
      console.error("Error submitting answer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAnswer, error, isLoading };
};

export { useFetchCount };
