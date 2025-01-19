import { useState } from "react";
import CreateDeck from "../../components/CreateDeck";
import Decks from "../../components/Decks";
import styles from "./PageDecks.module.css";

const PageDecks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <section className={styles.container__decks}>
      <div className={styles.decks__header}>
        <h2 className={styles.title}>Baralhos </h2>
        <button onClick={handleClickOpen} className={styles.decks__button}>
          Criar baralho
        </button>
      </div>
      {isOpen && <CreateDeck titleAction="Criar" handleClose={handleClose} />}
      <Decks edit={true} />
    </section>
  );
};

export default PageDecks;
