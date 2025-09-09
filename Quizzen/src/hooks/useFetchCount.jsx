import { useState } from "react";

const useFetchCount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitAnswer = async (quizId, optionId) => {
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
        `https://quiz-tpjgk.ondigitalocean.app/quiz/${quizId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, optionId }),
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAnswer, error, isLoading };
};

export { useFetchCount };
