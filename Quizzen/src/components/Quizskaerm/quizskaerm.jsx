import { useEffect, useState } from "react";
import Question from "../Question/question";
import styles from "./quizskaerm.module.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useFetch from "../../hooks/useFetch";

const Quizskaerm = () => {
  const { get, error, isLoading } = useFetch();
  const [questions, setQuestions] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswered = () => {
    setAnsweredCount((prevCount) => prevCount + 1);
  };

  const handleGoNext = () => {
    navigate("/sluttet");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const quizIds = [
          "68b6bc3d2fcf547b73893cba",
          "68b6bbbdbdc505969f25ff65",
        ];
        let allQuestions = [];
        for (const quizId of quizIds) {
          const questionsData = await get.questions(quizId);
          if (questionsData.data && questionsData.data.length > 0) {
            allQuestions.push({ ...questionsData.data[0], quizId });
          }
          if (questionsData.data && questionsData.data.length > 1) {
            allQuestions.push({ ...questionsData.data[1], quizId });
          }
        }
        setQuestions(allQuestions.slice(0, 2)); // kun de to første i alt
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchQuestions();
  }, []);

  if (isLoading) return <ClipLoader className={styles.loading} />;

  const isLast = currentIndex === questions.length - 1;

  return (
    <section className={styles.background}>
      {questions.length > 0 && (
        <Question
          question={questions[currentIndex]}
          key={questions[currentIndex]?._id}
          onAnswered={handleAnswered}
        />
      )}
      {answeredCount > currentIndex && !isLast && (
        <button
          id="next-btn"
          className={styles.nextBtn}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next
        </button>
      )}
      {isLast && answeredCount > currentIndex && (
        <button
          id="finish-btn"
          className={styles.nextBtn}
          onClick={handleGoNext}
        >
          Afslut
        </button>
      )}
    </section>
  );
};

export default Quizskaerm;
