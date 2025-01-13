import { IDeck } from "../../context/DecksContext";

interface IDeckProps {
  deck: IDeck;
}

const Deck = ({deck}: IDeckProps) => {


  return (
    <div>
      <p>{deck.title}</p>
    </div>
  );
};

export default Deck;
