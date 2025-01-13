import { useContext } from "react";
import Banner from "../../components/Banner";
import { DecksContext } from "../../context/DecksContext";
import Decks from "../../components/Decks";

const Main = () => {

  const {decks, setDecks} = useContext(DecksContext);
  return (
    <>
      <Banner />
    <Decks />
    </>
  );
};

export default Main;
