import styles from "../Quizskaerm/quizskaerm.module.css";
import { useState } from "react";

const Question = ({ question, onAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  let correctCount = 0;
  const handleAnswerClick = (answerId) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answerId);
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
                backgroundColor = "green"; // valgt og rigtigt
                correctCount++;
              } else if (isSelected && !isCorrect) {
                backgroundColor = "red"; // valgt og forkert
              } else if (!isSelected && isCorrect) {
                backgroundColor = "green"; // vis det rigtige svar
              }
              console.log(correctCount);
            }

            return (
              <button
                className={styles.btn}
                onClick={() => handleAnswerClick(answer._id)}
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
