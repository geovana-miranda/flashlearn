import { useCallback, useState } from "react";
import CreateDeck from "../../components/CreateDeck";
import Decks from "../../components/Decks";
import styles from "./PageDecks.module.css";

const PageDecks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = useCallback(function handleCloseModal() {
    setIsOpen(!isOpen);
  }, [isOpen])

  return (
    <section className={styles.container__decks}>
      <div className={styles.decks__header}>
        <h2 className={styles.title}>Baralhos </h2>
        <button onClick={handleCloseModal} className={styles.decks__button}>
          Criar baralho
        </button>
      </div>
      {isOpen && <CreateDeck titleAction="Criar" handleCloseModal={handleCloseModal} />}
      <Decks />
    </section>
  );
};

export default PageDecks;
