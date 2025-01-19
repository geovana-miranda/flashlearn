import styles from "./Banner.module.css";
import imagem from "../../assets/img/imagem-inicio.png";
import { useState } from "react";
import CreateDeck from "../CreateDeck";

const Banner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setIsOpen(true);
  }

  function handleClose () {
    setIsOpen(false);
  };

  return (
    <section className={styles.banner}>
      <div className={styles.banner__container}>
        <p className={styles.banner__text1}>
          Torne seus estudos mais dinâmicos e eficazes com nossa ferramenta
          intuitiva.
        </p>
        <p className={styles.banner__text}>
          <strong>Crie</strong>, <strong>organize</strong> e <strong>revise</strong> seus próprios flashcards de forma prática,
          personalizada e no seu ritmo.
        </p>
        <span>
          <button onClick={handleClickOpen} className={styles.banner__button}>Criar baralho</button>
        </span>
      </div>
      {isOpen && <CreateDeck titleAction="Criar" handleClose={handleClose} />}
      <img className={styles.banner__image} src={imagem} alt="" />
    </section>   
  )
}

export default Banner
