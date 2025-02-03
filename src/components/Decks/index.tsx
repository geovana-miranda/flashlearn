import { useContext } from "react";
import { DecksContext } from "../../context/DecksContext";
import Deck from "../Deck";
import styles from "./Decks.module.css";
import { IDeck } from "../../types/types";
import React from "react";

const Decks = React.memo(function Decks() {
  const { decks } = useContext(DecksContext);
  return (
    <div>
      {decks.length <= 0 && (
        <span className={styles.empty__msg}>
          Você ainda não adicinou nenhum baralho.
        </span>
      )}

      <ul className={styles.list__decks}>
        {decks.map((deck: IDeck) => {
          return (
            <li className={styles.decks__items} key={deck.id}>
              <Deck deck={deck} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Decks;
