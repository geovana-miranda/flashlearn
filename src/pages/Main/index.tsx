// import { useContext } from "react";
import Banner from "../../components/Banner";
// import { DecksContext } from "../../context/DecksContext";
import Decks from "../../components/Decks";
import styles from "./Main.module.css";

const Main = () => {
  // const {decks, setDecks} = useContext(DecksContext);
  return (
    <>
      <Banner />
      <div className={styles.container__decks}>
        <h2 className={styles.title}>Baralhos </h2>
        <Decks edit={false} />
      </div>
    </>
  );
};

export default Main;
