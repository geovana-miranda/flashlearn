import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface IDeck {
  id: string;
  title: string;
  description?: string;
  cards: ICards[] | [];
}

export interface ICards {
  id: string;
  term: string;
  definition: string;
}

export interface IDeckContext {
  decks: IDeck[];
  setDecks: Dispatch<SetStateAction<IDeck[]>>;
}

const defaultState = {
  decks: [],
  setDecks: () => {},
} as unknown as IDeckContext;

export const DecksContext = createContext(defaultState);

export default function DecksProvider({ children }: { children: ReactNode }) {
  const [decks, setDecks] = useState<IDeck[]>([]);

  useEffect(() => {
    const savedDecks = localStorage.getItem("decks");

    if (savedDecks) {
        setDecks(JSON.parse(savedDecks));
    } else {
        setDecks([]);
    }

  }, []);

  useEffect(() => {
    if (decks.length > 0) {
      localStorage.setItem("decks", JSON.stringify(decks));
    }
  }, [decks]);

  return (
    <DecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </DecksContext.Provider>
  );
}
