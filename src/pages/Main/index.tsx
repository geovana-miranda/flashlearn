import Banner from "../../components/Banner";
import Decks from "../../components/Decks";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <>
      <Banner />
      <div className={styles.container__decks}>
        <h2 className={styles.title}>Seus baralhos </h2>
        <Decks/>
      </div>
    </>
  );
};

export default Main;
