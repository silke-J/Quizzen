import styles from "./startskaerm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useNavigate } from "react-router-dom";

const Startskærm = () => {
  const { createUser, isLoading, error } = useFetchUser();
  const [submittedResponse, setSubmittedResponse] = useState(null);

    const navigate = useNavigate;
  const schema = yup.object({
    name: yup.string().required("Navn er påkrævet"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!isLoading && submittedResponse) {
      toast.success(`Tak for din besked, ${submittedResponse.data.name}!`);
    }
  }, [isLoading, submittedResponse]);

  const onSubmit = async (data) => {
    const jsonData = {
      name: data.name,
    };

    try {
      const response = await createUser(jsonData);
      console.log(response);
      if (response?.status === "ok") {
        setSubmittedResponse(response);
           navigate("/Quiz");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };
  if (isLoading) return <ClipLoader />;

  return (
    <section className={styles.background}>
      <div className={styles.info}>
        <h2>Velkomme til quizzen </h2>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <label htmlFor="name">Skive dit navn for at starte</label>

            <input
              className={styles.input}
              type="name"
              placeholder="Indtast navn"
              id="name"
              {...register("name", { required: true })}
              required
            />
            <p>{errors.name?.message}</p>
          </div>

          <button type="submit">
            <a>Start</a>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Startskærm;
