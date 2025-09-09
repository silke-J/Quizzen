import { useFetchCount } from "../../hooks/useFetchCount";
import styles from "../Quizskaerm/quizskaerm.module.css";
import { useState } from "react";
import VMS from "../../../public/vms.jpg";

const Question = ({ question, onAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { submitAnswer, error, isLoading } = useFetchCount();

  const handleAnswerClick = async (optionId) => {
    if (selectedAnswer) return;
    setSelectedAnswer(optionId);
    try {
      // Brug quizId fra spørgsmålet!
      const result = await submitAnswer(question.quizId, optionId);
      // ...evt. ekstra kode...
    } catch (error) {
      console.log("Fejl ved submitAnswer:", error);
    }
    if (onAnswered) onAnswered();
  };

  return (
    <section>
      <div className={styles.quiz} key={question._id}>
        <img src={VMS} alt="" />
        <h2 id="question">{question?.question}</h2>
        <div className={styles.buttons} id="answer-buttons">
          {question?.options.map((answer) => {
            const isSelected = selectedAnswer === answer._id;
            const isCorrect = answer._id === question.correctOptionId;

            let backgroundColor = "";
            if (selectedAnswer) {
              if (isSelected && isCorrect) {
                let currentCount =
                  parseInt(localStorage.getItem("userAnswersCount")) || 0;
                localStorage.setItem("userAnswersCount", currentCount + 1);
                backgroundColor = "green";
              } else if (isSelected && !isCorrect) {
                backgroundColor = "red";
              } else if (!isSelected && isCorrect) {
                backgroundColor = "green";
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
