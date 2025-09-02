import { useEffect, useState } from "react";


const useFetchQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  //   Get all questions
  const fetchQuiz = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/quizs`
      );
      const data = await response.json();
      setQuestion(data.data);
    } catch (error) {
      setError("Der skete en fejl", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get by ID
  const fetchQuizById = async (id) => {
    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/quiz/${id}`
      );
      const result = await response.json();

      return result.data;
    } catch (error) {
      console.log("fejl", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return {
    questions,
    fetchQuizById,
    error,
    isLoading,
  };
};

export { useFetchQuiz}
