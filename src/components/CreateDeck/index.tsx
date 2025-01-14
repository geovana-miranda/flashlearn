import { useContext, useState } from "react";
import styles from "./CreateDeck.module.css";
import { DecksContext } from "../../context/DecksContext";
import { v4 as uuidv4 } from "uuid";

interface ICreateDeckProps {
  handleClose: () => void;
}

export default function CreateDeck(props: ICreateDeckProps) {
  const { handleClose } = props;
  const { decks, setDecks } = useContext(DecksContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title) {
      setError("Digite um título válido");
      return;
    }

    const exists = decks.some(
      (deck) => deck.title.toLowerCase() === title.toLowerCase()
    );

    if (exists) {
      setError("Esse baralho já existe");
      return;
    }

    const newDeck = {
      id: uuidv4(),
      title: title,
      description: description,
    };

    setDecks((prev) => [...prev, newDeck]);

    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Criar baralho</h3>
        {error ? <p className={styles.error}>{error}</p> : ""}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <span>Título:</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </label>

          <label className={styles.label}>
            <span>Descrição:</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </label>
          <div className={styles.button__container}>
            <button onClick={handleClose} className={styles.button__cancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.button__create}>
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
