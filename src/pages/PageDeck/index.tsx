import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { DecksContext, ICard } from "../../context/DecksContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./PageDeck.module.css";
import CreateCard from "../../components/CreateCard";

const PageDeck = () => {
  const { idDeck } = useParams();
  const { decks, setDecks } = useContext(DecksContext);
  const deck = decks.find((deck) => deck.id === idDeck);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cardToEdit, setCardToEdit] = useState<ICard | null>(null);

  function handleClickOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
    setIsEditing(false);
  }

  function deleteCard(id: string) {
    const updatedCards = deck!.cards.filter(card => card.id !== id);
    const updatedDecks = decks.map(item => item.id === deck!.id ? {...item, cards: updatedCards} : item);
    setDecks(updatedDecks);
  }

  function editCard(card: ICard) {
    setIsEditing(true);
    setCardToEdit(card);

  }

  return (
    <section className={styles.container__deck}>
      <div className={styles.deck__header}>
        <h2 className={styles.title}>{deck!.title}</h2>
        <button onClick={handleClickOpenModal} className={styles.deck__button}>
          Adicionar card
        </button>
      </div>
      <div className={styles.container__cards}>
        {deck!.cards.map((card) => (
          <div key={card.id} className={styles.container__card}>
            <p>{card.term}</p>
            <p>{card.definition}</p>
            <div className={styles.container__button}>
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
      {isOpen && (
        <CreateCard idDeck={idDeck!} handleCloseModal={handleCloseModal} />
      )}
      {isEditing && cardToEdit && (
        <CreateCard cardToEdit={cardToEdit} idDeck={idDeck!} handleCloseModal={handleCloseModal} />
      )}
    </section>
  );
};

export default PageDeck;
