import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateCard.module.css";
import { DecksContext, ICard } from "../../context/DecksContext";

interface ICreateCardProps {
  cardToEdit?: ICard;
  idDeck: string;
  handleCloseModal: () => void;
}

const CreateCard = (props: ICreateCardProps) => {
  const { cardToEdit, idDeck, handleCloseModal } = props;
  const { decks, setDecks } = useContext(DecksContext);
  const [term, setTerm] = useState<string>(cardToEdit?.term || "");
  const [definition, setDefinition] = useState<string>(
    cardToEdit?.definition || ""
  );
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!term || !definition) {
      setError("O card deve ter um termo e uma definição válidos");
      return;
    }

    const exist = decks
      .find((deck) => deck.id === idDeck)
      ?.cards.find(
        (card) =>
          card.term.trim().toLocaleLowerCase() ===
          term.trim().toLocaleLowerCase()
      );

    if (cardToEdit) {
      if (exist && exist.id !== cardToEdit.id) {
        setError("Você já adicionou um card com esse termo");
        return;
      }

      if (cardToEdit.term === term && cardToEdit.definition === definition) {
        handleCloseModal();
        return;
      }

      const updatedCard = decks.map((deck) =>
        deck.id === idDeck
          ? {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === cardToEdit.id
                  ? { ...card, term: term, definition: definition }
                  : card
              ),
            }
          : deck
      );

      setDecks(updatedCard);
    } else {
      if (exist) {
        setError("Você já adicionou um card com esse termo");
        return;
      }

      const newCard = {
        id: uuidv4(),
        term: term,
        definition: definition,
      };

      const updatedDecks = decks.map((deck) => {
        if (deck.id === idDeck) {
          return { ...deck, cards: [...deck.cards, newCard] };
        }
        return deck;
      });

      setDecks(updatedDecks);
    }

    resetForm();
    handleCloseModal();
  }

  function resetForm() {
    setTerm("");
    setDefinition("");
    setError("");
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Adicionar card</h3>
        {error ? <p className={styles.error}>{error}</p> : ""}
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
