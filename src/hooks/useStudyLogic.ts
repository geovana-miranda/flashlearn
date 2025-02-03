import { useEffect, useState } from "react";
import { ICard, IDeck } from "../types/types";

const useStudyLogic = (deck: IDeck) => {
  const [newStudyAccuracy, setNewStudyAccuracy] = useState<number | null>(null);
  const shuffledCards = shuffleArray(deck.cards);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsToStudy, setcardsToStudy] = useState<ICard[]>(shuffledCards);
  const currentCardToStudy = cardsToStudy[currentIndex];
  const [totalCards, setTotalCards] = useState<number>(shuffledCards.length);
  const [score, setScore] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [changeToDefinition, setChangeToDefinition] = useState<boolean>(false);
  const [cardsToReview, setCardsToReview] = useState<ICard[]>([]);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [lastStudyAccuracy, setLastStudyAccuracy] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!currentCardToStudy && !isReviewing) {
      setLastStudyAccuracy(deck.studyAccuracy);

      const newAccuracy = Number(
        ((correctAnswers / totalCards) * 100).toFixed(1)
      );
      setNewStudyAccuracy(newAccuracy);
    }
  }, [currentCardToStudy]);

  function shuffleArray(array: ICard[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    return shuffled;
  }

  function handleNotKnow(card: ICard) {
    if (!isReviewing) {
      setWrongAnswers((prev) => prev + 1);
      setCardsToReview((prev) => [...prev, card]);
    }
    updateCardsToStudy(card);
  }

  function updateCardsToStudy(card: ICard) {
    const currentId = card.id;

    const updatedCardsToStudy = cardsToStudy.filter(
      (card) => card.id !== currentId
    );
    setcardsToStudy(updatedCardsToStudy);
    setScore((prev) => prev + 1);

    if (updatedCardsToStudy.length === currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
    setIsAnswerRevealed(false);
    setChangeToDefinition(false);
  }

  function handleAlreadyKnow(card: ICard) {
    if (!isReviewing) {
      setCorrectAnswers((prev) => prev + 1);
    }
    updateCardsToStudy(card);
  }

  function restart() {
    setCurrentIndex(0);
    setcardsToStudy(shuffledCards);
    setIsReviewing(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setScore(0);
    setCardsToReview([]);
    setTotalCards(shuffledCards.length);
  }

  function reviewCards() {
    setIsReviewing(true);
    setCurrentIndex(0);
    setcardsToStudy(cardsToReview);
    setScore(0);
    setCardsToReview([]);
    setTotalCards(cardsToReview.length);
  }

  function skipCard() {
    if (cardsToStudy) {
      if (currentIndex < cardsToStudy.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  }

  return {
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
    cardsToReview
  };
};

export default useStudyLogic;
