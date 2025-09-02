import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Question from "../Question/question";
import styles from "./quizskaerm.module.css";


const Quizskaerm = () => {
    const { get, error, isLoading } = useFetch();
    const [questions, setQuestions] = useState([]);

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

     if (isLoading)
       return (
         <section className={styles.background}>
           {questions.map((question) => (
             <Question question={question} key={question._id} />
           ))}
         </section>
       );
};
export default Quizskaerm;
