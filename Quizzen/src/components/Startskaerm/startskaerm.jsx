import styles from "./startskaerm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useNavigate } from "react-router-dom";

const Startskaerm = () => {
  const { createUser, error, isLoading, successMsg } = useFetchUser();

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
    await createUser({ name: data.name });
    navigate("/quiz");
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
            <div className={styles.fejlbeskeder}>
              <p>{errors.name?.message}</p>
              {successMsg && <p className={styles.beskedName}>{successMsg}</p>}
            </div>
          </div>

          <div className={styles.knap}>
            <button type="submit">Start</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Startskaerm;
