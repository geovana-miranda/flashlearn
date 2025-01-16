import { useContext } from "react";
import { DecksContext, IDeck } from "../../context/DecksContext";
import Deck from "../Deck/Deck";
import style from "./Decks.module.css";

const Decks = () => {
    const { decks, setDecks } = useContext(DecksContext);
  return (
      <section className={style.container__decks}>
        <h2 className={style.title}>Baralhos </h2>
        <ul className={style.list__decks}>
        {decks.map((deck: IDeck) => {
          return <li className={style.decks__items}  key={deck.id}>
            <Deck deck={deck}/>
          </li>
        })}
        </ul>
      </section>
  )
}

export default Decks
