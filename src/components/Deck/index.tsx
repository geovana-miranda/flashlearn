import { DecksContext } from "../../context/DecksContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./Deck.module.css";
import { useCallback, useContext, useState } from "react";
import CreateDeck from "../CreateDeck";
import { useNavigate } from "react-router-dom";
import { IDeck } from "../../types/types";

interface IDeckProps {
  deck: IDeck;
}

const Deck = ({ deck }: IDeckProps) => {
  console.log("render deck")
  const { decks, setDecks } = useContext(DecksContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deckToEdit, setDeckToEdit] = useState<IDeck | null>(null);

  const navigate = useNavigate();

  const handleCloseModal = useCallback(function handleCloseModal() {
    setIsOpen(false);
  }, [])

  function deleteDeck(e: React.MouseEvent<SVGElement, MouseEvent>, id: string) {
    e.stopPropagation();
    const updatedDecks = decks.filter((deck) => deck.id !== id);
    setDecks(updatedDecks);
  }

  function editDeck(e: React.MouseEvent<SVGElement, MouseEvent>, deck: IDeck) {
    e.stopPropagation();
    setDeckToEdit(deck);
    setIsOpen(true);
  }

  function handleDeckClick(id: string) {
    navigate(`/baralhos/${id}`);
  }

  return (
    <>
      <div className={styles.container__deck} onClick={() => handleDeckClick(deck.id)}>
        <p className={styles.title}>{deck.title}</p>
        <p className={styles.cards}>
          {deck.cards.length === 0
            ? "nenhum card"
            : deck.cards.length === 1
            ? `${deck.cards.length} card`
            : `${deck.cards.length} cards`}
        </p>
        <div className={styles.container__cardsicons}>
            <MdOutlineDeleteForever
              onClick={(e) => deleteDeck(e, deck.id)}
              title="Deletar"
              className={styles.icon}
            />
            <MdOutlineEdit
              onClick={(e) => editDeck(e, deck)}
              title="Editar"
              className={styles.icon}
            />
          
        </div>

      </div>
      {isOpen && (
        <CreateDeck
          deckToEdit={deckToEdit!}
          titleAction="Editar"
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Deck;
