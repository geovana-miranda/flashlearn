import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface IDeck {
  id: string;
  title: string;
  description?: string;
}

export interface IDeckContext {
    decks: IDeck[];
    setDecks: Dispatch<SetStateAction<IDeck[]>>
}

const defaultState = {
    decks: [],
    setDecks: () => { },
} as unknown as IDeckContext;

export const DecksContext = createContext(defaultState);

export default function DecksProvider({children} : {children: ReactNode}) {
    const [decks, setDecks] = useState<IDeck[]>([]);

    return (
        <DecksContext.Provider value={{decks, setDecks}}>
        {children}
        </DecksContext.Provider>
    )
}