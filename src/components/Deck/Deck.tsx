import { IDeck } from "../../context/DecksContext";
import styles from "./Deck.module.css";

interface IDeckProps {
  deck: IDeck;
}

const Deck = ({ deck }: IDeckProps) => {
  return (
    <div className={styles.container__deck}>
      <p className={styles.cards}>15 cards</p>
      <p className={styles.title}>{deck.title}</p>
      <div className={styles.container__button}>
        <button className={styles.button}>Estudar</button>
      </div>
    </div>
  );
};

export default Deck;
