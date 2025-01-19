import { useContext } from "react";
import { DecksContext, IDeck } from "../../context/DecksContext";
import Deck from "../Deck";
import styles from "./Decks.module.css";

interface IDecksProp {
  edit: boolean;
}

const Decks = ({ edit }: IDecksProp) => {
  const { decks, setDecks } = useContext(DecksContext);
  return (

      <ul className={styles.list__decks}>
        {decks.map((deck: IDeck) => {
          return (
            <li className={styles.decks__items} key={deck.id}>
              <Deck deck={deck} edit={edit} />
            </li>
          );
        })}
      </ul>

  );
};

export default Decks;
