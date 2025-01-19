import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateCard.module.css";
import { DecksContext, IDeck } from "../../context/DecksContext";

interface ICreateCardProps {
  currentDeck: IDeck;
  handleCloseModal: () => void;
}

const CreateCard = (props: ICreateCardProps) => {
  const {currentDeck, handleCloseModal} = props;

  const {decks, setDecks} = useContext(DecksContext);
  const [term, setTerm] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCard = {
      id: uuidv4(),
      term: term,
      definition: definition
    }

    const updateDecks = decks.map(deck => {
      if (deck.id === currentDeck.id) {
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck;
    })
    
    setDecks(updateDecks);

  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Adicionar card</h3>
        {/* {error ? <p className={styles.error}>{error}</p> : ""} */}
        <form className={styles.form}>
          <label className={styles.label}>
            <span>Termo:</span>
            <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              type="text"
              maxLength={20}
            />
          </label>

          <label className={styles.label}>
            <span>Definição:</span>
            <input
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
              type="text"
              maxLength={40}
            />
          </label>
          <div className={styles.button__container}>
            <button
              type="button"
              
              onClick={handleCloseModal}
              className={styles.button__cancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
                onClick={handleSubmit}
              className={styles.button__create}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
