import { useContext, useEffect, useRef, useState } from "react";
import styles from "./CreateDeck.module.css";
import { DecksContext, IDeck } from "../../context/DecksContext";
import { v4 as uuidv4 } from "uuid";

interface ICreateDeckProps {
  deckToEdit?: IDeck;
  titleAction: string;
  handleCloseModal: () => void;
}

export default function CreateDeck(props: ICreateDeckProps) {
  const { deckToEdit, titleAction, handleCloseModal } = props;
  const { decks, setDecks } = useContext(DecksContext);
  const [title, setTitle] = useState<string>(deckToEdit?.title || "");
  const [description, setDescription] = useState<string>(
    deckToEdit?.description || ""
  );

  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title) {
      setError("Digite um título válido");
      return;
    }

    const exists = decks.find(
      (deck) => deck.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (deckToEdit) {

      if (exists && exists.id !== deckToEdit.id) {
        setError("Esse baralho já existe");
        return;
      }

      const updateDecks = decks.map((item) =>
        item.id === deckToEdit.id
          ? { ...deckToEdit, title: title, description: description }
          : item
      );
      
      setDecks(updateDecks);
    } else {

      if (exists) {
        setError("Esse baralho já existe");
        return;
      }

      const newDeck = {
        id: uuidv4(),
        title: title,
        description: description,
        cards: []
      };

      setDecks((prev) => [...prev, newDeck]);
    }

    setTitle("");
    setDescription("");
    setError("");
    handleCloseModal();
  } 

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{titleAction} baralho</h3>
        {error ? <p className={styles.error}>{error}</p> : ""}
        <form className={styles.form}>
          <label className={styles.label}>
            <span>Título:</span>
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              maxLength={20}
            />
          </label>

          <label className={styles.label}>
            <span>Descrição:</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
}
