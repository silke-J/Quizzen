import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Question from "../Question/question";
import styles from "./quizskaerm.module.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Quizskaerm = () => {
  const { get, error, isLoading } = useFetch();
  const [questions, setQuestions] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
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
        const questionsData = await get.questions();
        setQuestions(questionsData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchQuestions();
  }, []);

  console.log(questions);

  if (isLoading) return <ClipLoader className={styles.loading} />;

  return (
    <section className={styles.background}>
      {questions.slice(0, 2).map((question) => (
        <Question
          question={question}
          key={question._id}
          onAnswered={handleAnswered}
        />
      ))}

      {answeredCount >= 2 && (
        <button id="next-btn" className={styles.nextBtn} onClick={handleGoNext}>
          Next
        </button>
      )}
    </section>
  );
};
export default Quizskaerm;
