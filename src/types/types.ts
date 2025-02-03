import { Dispatch, SetStateAction } from "react";

export interface IDeck {
  id: string;
  title: string;
  description?: string;
  studyAccuracy: number | null;
  cards: ICard[] | [];
}

export interface ICard {
  id: string;
  term: string;
  definition: string;
}

export interface IDeckContext {
  decks: IDeck[];
  setDecks: Dispatch<SetStateAction<IDeck[]>>;
}