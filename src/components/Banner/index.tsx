import styles from "./Banner.module.css";
import imagem from "../../assets/img/imagem-inicio.png";
import { useCallback, useState } from "react";
import CreateDeck from "../CreateDeck";

const Banner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal= useCallback(function handleCloseModal() {
    setIsOpen(!isOpen);
  }, [isOpen])

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
          <button onClick={handleCloseModal} className={styles.banner__button}>Criar baralho</button>
        </span>
      </div>
      {isOpen && <CreateDeck titleAction="Criar" handleCloseModal={handleCloseModal} />}
      <img className={styles.banner__image} src={imagem} alt="" />
    </section>   
  )
}

export default Banner
