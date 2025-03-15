import styles from "./Statistics.module.css";

interface IStatistics {
  wrongAnswers: number;
  correctAnswers: number;
  isReviewing: boolean;
  totalCards: number;
  lastStudyAccuracy: number | null;
  newStudyAccuracy: number;
}

const Statistics = ({
  wrongAnswers,
  correctAnswers,
  isReviewing,
  totalCards,
  lastStudyAccuracy,
  newStudyAccuracy,
}: IStatistics) => {
  return (
    <section className={styles.statistics__container}>
      {isReviewing ? (
        <div className={styles.congratulations}>
          <h2 className={styles.congratulations__title}>Ótimo trabalho! 🎉</h2>
          <p className={styles.congratulations__subtitle}>
            Estudar é um processo contínuo. Continue praticando!
          </p>
        </div>
      ) : (
        <div className={styles.statistics}>
          <h2 className={styles.statistics__title}>Estatísticas</h2>
          <div className={styles.statistics__results}>
            <p className={styles.statistics__congratulations}>
              <span className={styles.icon}>✅</span> Você acertou{" "}
              <strong>{correctAnswers}</strong> de {totalCards}{" "}
              {totalCards > 1 ? "cards" : "card"}!
            </p>
            <p className={styles.statistics__congratulations}>
              <span className={styles.icon}>🔄</span> Você errou{" "}
              <strong>{wrongAnswers}</strong> de {totalCards}{" "}
              {totalCards > 1 ? "cards" : "card"}.
            </p>
            <p className={styles.statistics__congratulations}>
              <span className={styles.icon}>📈</span> Taxa de acerto:{" "}
              <strong>{newStudyAccuracy}%</strong>
            </p>
            {lastStudyAccuracy != null &&
              (newStudyAccuracy > lastStudyAccuracy ? (
                <>
                  <p className={styles.statistics__congratulations}>
                    <span className={styles.icon}>😄</span> Você melhorou em
                    relação à última sessão!
                  </p>
                  <p className={styles.statistics__congratulations}>
                    Sua taxa anterior foi: <strong>{lastStudyAccuracy}%</strong>
                  </p>
                </>
              ) : (
                <>
                {newStudyAccuracy != 100 && lastStudyAccuracy != 100  &&                  
                  (<p className={styles.statistics__congratulations}>
                    <span className={styles.icon}>😞</span> Você não melhorou em
                    relação à última sessão!
                  </p>)}
                  <p className={styles.statistics__congratulations}>
                    Sua taxa anterior foi: <strong>{lastStudyAccuracy}%</strong>
                  </p>
                </>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Statistics;
