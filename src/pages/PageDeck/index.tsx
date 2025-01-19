import { useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { DecksContext, IDeck } from "../../context/DecksContext";
import styles from "./PageDeck.module.css";
import CreateCard from "../../components/CreateCard";

const PageDeck = () => {
    const {idDeck} = useParams();
    const {decks, setDecks} = useContext(DecksContext);
    const deck = decks.find(deck => deck.id === idDeck);
    const [currentDeck, setCurrentDeck] = useState<IDeck>(deck!);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleClickOpenModal() {
      setIsOpen(true);
    }

    function handleCloseModal() {
      setIsOpen(false);
    }

  return (    
    <section className={styles.container__deck}>
      <div className={styles.deck__header}>
        <h2 className={styles.title}>{currentDeck!.title}</h2>
        <button onClick={handleClickOpenModal} className={styles.deck__button}>
          Adicionar card
        </button>
      </div>
      <div className={styles.container__cards}>
        <div className={styles.container__card}>
          <p>termo</p>
          <p>definicao</p>
          <p>botoes</p>
        </div>
      </div>
      {isOpen && <CreateCard currentDeck={currentDeck} handleCloseModal={handleCloseModal} /> }
    </section>
 
  )
}

export default PageDeck
