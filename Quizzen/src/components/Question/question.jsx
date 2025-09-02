import styles from "../Quizskaerm/quizskaerm.module.css";


const Question = ({ question }) => {
  return (
    <section>
      <div class={styles.quiz} key={question._id}>
        <img src="../../../public/vms.jpg" alt="" />

        <h2 id="question">{question?.question}</h2>

        <div className={styles.buttons} id="answer-buttons">
          <button class={styles.btn}>{question?.option}</button>
        </div>

        <button className={styles.nextBtn} id="next-btn">
          Next
        </button>
      </div>
    </section>
  );
};

export default Question;
