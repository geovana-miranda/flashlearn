import { IDeck } from "../../context/DecksContext";

interface IDeckProps {
  deck: IDeck;
}

const Deck = ({deck}: IDeckProps) => {


  return (
    <div>
      <p>15 cards</p>
      <p>{deck.title}</p>
      <button>Estudar</button>
    </div>
  );
};

export default Deck;
