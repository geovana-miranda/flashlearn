import { useState } from "react";
import CreateDeck from "../../components/CreateDeck";
import Decks from "../../components/Decks";
import styles from "./PageDecks.module.css";

const PageDecks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClickOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <section className={styles.container__decks}>
      <div className={styles.decks__header}>
        <h2 className={styles.title}>Baralhos </h2>
        <button onClick={handleClickOpenModal} className={styles.decks__button}>
          Criar baralho
        </button>
      </div>
      {isOpen && <CreateDeck titleAction="Criar" handleCloseModal={handleCloseModal} />}
      <Decks edit={true} />
    </section>
  );
};

export default PageDecks;
