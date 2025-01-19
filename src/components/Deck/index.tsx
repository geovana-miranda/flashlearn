import { DecksContext, IDeck } from "../../context/DecksContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./Deck.module.css";
import { useContext, useEffect, useState } from "react";
import CreateDeck from "../CreateDeck";

interface IDeckProps {
  deck: IDeck;
  edit: boolean;
}

const Deck = ({ deck, edit }: IDeckProps) => {
  const { decks, setDecks } = useContext(DecksContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deckToEdit, setDeckToEdit] = useState<IDeck | null>(null);

  function handleClose() {
    setIsOpen(false);
    setIsEditing(false);
  }

  function deleteDeck(e: React.MouseEvent<SVGElement, MouseEvent>, id: string) {
    e.stopPropagation();
    const updatedDecks = decks.filter((deck) => deck.id !== id);
    setDecks(updatedDecks);
  }

  function editDeck(e: React.MouseEvent<SVGElement, MouseEvent>, deck: IDeck) {
    e.stopPropagation();
    setDeckToEdit({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    });
    setIsEditing(true);
  }

  useEffect(() => {
    if (isEditing) setIsOpen(true);
  }, [isEditing]);

  
  function handleClick() {
    console.log("clicou no deck")
  }

  return (
    <>
      <div  onClick={handleClick}  className={styles.container__deck}>
        <p className={styles.cards}>15 cards</p>
        <p className={styles.title}>{deck.title}</p>

        {edit ? (
          <div className={styles.container__button}>
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
        ) : (
          <div className={styles.container__button}>
            <button className={styles.button}>Estudar</button>
          </div>
        )}
      </div>
      {isOpen && (
        <CreateDeck
          deckToEdit={deckToEdit}
          titleAction="Editar"
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Deck;
