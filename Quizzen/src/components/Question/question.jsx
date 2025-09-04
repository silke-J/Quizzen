import { useFetchCount } from "../../hooks/useFetchCount";
import styles from "../Quizskaerm/quizskaerm.module.css";
import { useState } from "react";

const Question = ({ question, onAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { submitAnswer, error, isLoading } = useFetchCount();

  const handleAnswerClick = async (answerId) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answerId);
    try {
      const result = await submitAnswer(answerId);
      if (result?.updatesUser) {
        console.log(
          "nyt antal korrekte svar",
          result.updatedUser.correctAnswersCount
        );
      }
    } catch (error) {
      console.log("Fejl ved submitAnswer:", error);
    }
    if (onAnswered) onAnswered();
  };

  return (
    <section>
      <div className={styles.quiz} key={question._id}>
        <img src="../../../public/vms.jpg" alt="" />

        <h2 id="question">{question?.question}</h2>

        <div className={styles.buttons} id="answer-buttons">
          {question?.options.map((answer) => {
            const isSelected = selectedAnswer === answer._id;
            const isCorrect = answer._id === question.correctOptionId;

            let backgroundColor = "";
            if (selectedAnswer) {
              if (isSelected && isCorrect) {
                let currentCount = parseInt(localStorage.getItem("userAnswersCount")) || 0;
                localStorage.setItem("userAnswersCount", currentCount + 1);
                backgroundColor = "green"; // valgt og rigtigt
              } else if (isSelected && !isCorrect) {
                backgroundColor = "red"; // valgt og forkert
              } else if (!isSelected && isCorrect) {
                backgroundColor = "green"; // vis det rigtige svar
              }
            }

            return (
              <button
                onClick={() => handleAnswerClick(answer._id)}
                className={styles.btn}
                disabled={!!selectedAnswer}
                style={{
                  cursor: selectedAnswer ? "default" : "pointer",
                  backgroundColor,
                  color: backgroundColor ? "white" : "black",
                }}
                key={answer._id}
              >
                {answer.text}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Question;
