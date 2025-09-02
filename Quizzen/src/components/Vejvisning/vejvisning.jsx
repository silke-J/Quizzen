import styles from "./vejvisning.module.css";

const Vejvisning = () => {
  return (
    <section className={styles.background}>
      <div className={styles.info}>
        <h2>Tak for deltage i den quiz</h2>

        <h3>Denne næste qr kode kan du finde være lærerværelset. </h3>
      </div>
    </section>
  );
};
export default Vejvisning;
