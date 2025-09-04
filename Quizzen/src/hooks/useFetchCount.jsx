import { useState } from "react";

const useFetchCount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitAnswer = async (optionId) => {
    setIsLoading(true);
    setError(null);
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/quiz/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, optionId }),
        }
      );
      const result = await response.json();
      if (result.updated) {
        localStorage.setItem(
          "userAnswersCount",
          result.updated.userAnswersCount
        );
      }
      return result;
    } catch (error) {
      // setError(error);
      console.error("Error submitting answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAnswer, error, isLoading };
};

export { useFetchCount };
