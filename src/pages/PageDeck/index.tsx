import { useCallback, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DecksContext } from "../../context/DecksContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./PageDeck.module.css";
import CreateCard from "../../components/CreateCard";
import { ICard, IDeck } from "../../types/types";

const PageDeck = () => {
  const { idDeck } = useParams();
  const { decks, setDecks } = useContext(DecksContext);
  const deck = decks.find((deck) => deck.id === idDeck) as IDeck;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cardToEdit, setCardToEdit] = useState<ICard | null>(null);
  const navigate = useNavigate();

  const handleClickOpenModal = useCallback(function handleClickOpenModal() {
    setIsOpen(true);
  },[])

  const handleCloseModal = useCallback(function handleCloseModal() {
    setIsOpen(false);
    setIsEditing(false);
  }, [])

  function deleteCard(id: string) {
    const updatedCards = deck.cards.filter((card) => card.id !== id);
    const updatedDecks = decks.map((item) =>
      item.id === deck.id ? { ...item, cards: updatedCards } : item
    );
    setDecks(updatedDecks);
  }

  function editCard(card: ICard) {
    setIsEditing(true);
    setCardToEdit(card);
  }

  function handleStudyCard(
    id: string
  ) {
    navigate(`/baralhos/estudar/${id}`);
  }

  return (
    <section className={styles.container__deck}>
      <div className={styles.deck__header}>
        <h2 className={styles.title}>{deck.title}</h2>
        <div className={styles.container__buttons}>
          <button
            onClick={handleClickOpenModal}
            className={`${styles.btn} ${styles.btn__newcard}`}
          >
            Novo card
          </button>
          <button
          disabled={deck.cards.length === 0 ? true : false}
            onClick={() => handleStudyCard( deck.id)}
            className={`${styles.btn} ${
              deck.cards.length === 0 ? styles.btn__study__disable : styles.btn__study
            }`}
          >
            Estudar baralho
          </button>
        </div>
      </div>

      <div className={styles.container__cards}>
        {deck.cards.length <= 0 && (
          <span className={styles.empty__msg}>
            Você ainda não adicinou nenhum card.
          </span>
        )}
        {deck.cards.map((card) => (
          <div key={card.id} className={styles.container__card}>
            <p>{card.term}</p>
            <p className={styles.definition}>{card.definition}</p>
            <div className={styles.container__icons}>
              <MdOutlineDeleteForever
                onClick={() => deleteCard(card.id)}
                title="Deletar"
                className={styles.icon}
              />
              <MdOutlineEdit
                onClick={() => editCard(card)}
                title="Editar"
                className={styles.icon}
              />
            </div>
          </div>
        ))}
      </div>

      {isOpen || (isEditing && cardToEdit) ?  (
        <CreateCard cardToEdit={isEditing ? cardToEdit! : undefined} idDeck={idDeck!} handleCloseModal={handleCloseModal} />
      ):null}

    </section>
  );
};

export default PageDeck;
