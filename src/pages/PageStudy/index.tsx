import { useParams } from "react-router-dom";
import { DecksContext } from "../../context/DecksContext";
import { useContext, useEffect } from "react";
import styles from "./PageStudy.module.css";
import Card from "../../components/Card";
import Statistics from "../../components/Statistics";
import { IDeck } from "../../types/types";
import useStudyLogic from "../../hooks/useStudyLogic";

const PageStudy = () => {
  
  const { idDeck } = useParams();
  const { decks, setDecks } = useContext(DecksContext);
  const deck = decks.find((deck) => deck.id === idDeck) as IDeck;

  const {
    currentCardToStudy,
    score,
    totalCards,
    isAnswerRevealed,
    setIsAnswerRevealed,
    changeToDefinition,
    setChangeToDefinition,
    wrongAnswers,
    correctAnswers,
    lastStudyAccuracy,
    newStudyAccuracy,
    restart,
    reviewCards,
    skipCard,
    handleNotKnow,
    handleAlreadyKnow,
    isReviewing,
    cardsToReview,
  } = useStudyLogic(deck);

  useEffect(() => {
    if (!currentCardToStudy && !isReviewing) {
      const newAccuracy = Number(
        ((correctAnswers / totalCards) * 100).toFixed(1)
      );

      const updatedDecks = decks.map((deck) =>
        deck.id === idDeck ? { ...deck, studyAccuracy: newAccuracy } : deck
      );
      setDecks(updatedDecks);
    }
  }, [currentCardToStudy]);

  return (
    <section className={styles.container__page}>
      <div className={styles.container__header}>
        <h2 className={styles.deck__title}>Baralho: {deck.title}</h2>
        <p className={styles.deck__subtitle}>
          ({deck.cards.length} {deck.cards.length > 1 ? "cards" : "card"})
        </p>
      </div>

      {currentCardToStudy ? (
        <>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress_fill}
              style={{ width: `${(score / totalCards) * 100}%` }}
            ></div>
          </div>
          <Card
            card={currentCardToStudy}
            isAnswerRevealed={isAnswerRevealed}
            setIsAnswerRevealed={setIsAnswerRevealed}
            changeToDefinition={changeToDefinition}
            setChangeToDefinition={setChangeToDefinition}
          />
        </>
      ) : (
        <Statistics
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          isReviewing={isReviewing}
          totalCards={totalCards}
          lastStudyAccuracy={lastStudyAccuracy}
          newStudyAccuracy={newStudyAccuracy!}
        />
      )}

      <div className={styles.container__buttons}>
        {currentCardToStudy ? (
          <>
            <button
              disabled={isAnswerRevealed}
              className={`${styles.btn} ${
                isAnswerRevealed ? styles.btn__not__disabled : styles.btn__not
              }`}
              onClick={skipCard}
            >
              Pular
            </button>
            <button
              disabled={!isAnswerRevealed}
              className={`${styles.btn} ${
                !isAnswerRevealed ? styles.btn__not__disabled : styles.btn__not
              }`}
              onClick={() => handleNotKnow(currentCardToStudy)}
            >
              Não sabia
            </button>
            <button
              disabled={!isAnswerRevealed}
              className={`${styles.btn} ${
                !isAnswerRevealed
                  ? styles.btn__already__disabled
                  : styles.btn__already
              }`}
              onClick={() => handleAlreadyKnow(currentCardToStudy)}
            >
              Já sabia
            </button>
          </>
        ) : cardsToReview.length > 0 ? (
          <button
            className={`${styles.btn} ${styles.btn__already} ${
              !isAnswerRevealed ? "disabled" : ""
            }`}
            onClick={reviewCards}
          >
            Revisar {cardsToReview.length}{" "}
            {cardsToReview.length > 1 ? "cards" : "card"}
          </button>
        ) : (
          <button
            className={`${styles.btn} ${styles.btn__already} ${
              !isAnswerRevealed ? "disabled" : ""
            }`}
            onClick={restart}
          >
            Reiniciar
          </button>
        )}
      </div>
    </section>
  );
};

export default PageStudy;
