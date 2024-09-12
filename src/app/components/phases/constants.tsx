import { Book } from "@/types";
import { Dispatch, SetStateAction } from "react";

export enum GameState {
  START,
  HELP,
  SELECT,
  QUESTIONS,
  GAMEOVER
}
export type Optional<T> = T | undefined;
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type SetGameState = SetState<GameState>;
export type SetBook = SetState<Optional<Book>>;