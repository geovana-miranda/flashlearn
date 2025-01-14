import { useContext } from "react";
import { DecksContext, IDeck } from "../../context/DecksContext";
import Deck from "../Deck/Deck";

const Decks = () => {
    const { decks, setDecks } = useContext(DecksContext);
  return (
          <section>
        <h2>Baralhos </h2>
        <ul>
        {decks.map((deck: IDeck) => {
          return <li key={deck.id}>
            <Deck deck={deck}/>
          </li>
        })}
        </ul>
      </section>
  )
}

export default Decks
