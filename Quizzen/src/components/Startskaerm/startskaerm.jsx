import styles from "./startskaerm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useNavigate } from "react-router-dom";

const Startskærm = () => {
  const { createUser, isLoading, error } = useFetchUser();

  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required("Navn er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Tilføj denne linje
    const jsonData = { name: data.name };
    const response = await createUser(jsonData);

    try {
      if (response?.status === "ok") {
        const user = response.data;
        localStorage.setItem("token", data.token);
        navigate("/quiz");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <ClipLoader />;

  return (
    <section className={styles.background}>
      <div className={styles.info}>
        <h2>Velkomme til quizzen </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <label htmlFor="name">Skriv dit navn for at starte</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Indtast navn"
              id="name"
              {...register("name", { required: true })}
              required
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <button type="submit">Start</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Startskærm;

// fx i din useFetchUser:
// const data = await response.json();
// data.token indeholder nu token
