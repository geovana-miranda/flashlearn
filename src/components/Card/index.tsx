import { ICard } from "../../types/types";
import styles from "./Card.module.css";

interface ICardProps {
  card: ICard;
  isAnswerRevealed: boolean;
  setIsAnswerRevealed: React.Dispatch<React.SetStateAction<boolean>>;
  changeToDefinition: boolean;
  setChangeToDefinition: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card = ({
  card,
  isAnswerRevealed,
  setIsAnswerRevealed,
  changeToDefinition,
  setChangeToDefinition,
}: ICardProps) => {


  
  function handleChange() {
    if (!changeToDefinition) {
      setIsAnswerRevealed(!isAnswerRevealed);
    } else {
      setChangeToDefinition(!changeToDefinition);
    }
  }

  return (
    <div className={styles.container__card}>
      {!isAnswerRevealed || changeToDefinition ? (
      <>
        <p className={styles.card__term}>{card.term}</p>
        <a className={styles.card__link} onClick={handleChange}>
          Clique aqui para ver a definição
        </a>
      </>
      ) : (
      <>
        <p className={styles.card__definition}>{card.definition}</p>
        <a
          className={styles.card__link}
          onClick={() => setChangeToDefinition(true)}
        >
          Clique aqui para ver o termo
        </a>
      </>
      )}
    </div>
  );
};

export default Card;
