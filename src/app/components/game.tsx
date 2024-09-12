import { useState } from "react";
import { GameState, Optional, SetBook, SetGameState } from "./phases/constants";
import { Start } from "./phases/start";
import { Help } from "./phases/help";
import { Select } from "./phases/select";
import { Book } from "@/types";
import { Questions } from "./phases/questions";
import { GameOver } from "./phases/gameover";

type GamePhaseProps = {state: GameState, setState: SetGameState};

function GamePhase({state, setState}: GamePhaseProps) {
  const [book, setBook] = useState<Optional<Book>>(undefined);
  const [message, setMessage] = useState<Optional<string>>(undefined);

  switch (state) {
    case GameState.START:
      return <Start setState={setState}/>
    case GameState.HELP:
      return <Help setState={setState} />
    case GameState.SELECT:
      return (
        <Select setState={setState} setBook={setBook}/>
      );
    case GameState.QUESTIONS:
      return (
        <Questions book={book!} setState={setState} setMessage={setMessage}/>
      )
    case GameState.GAMEOVER:
      return (
        <GameOver message={message!} setState={setState}/>
      )
    default:
      throw Error(`Developer Error: Unrecognized state of ${state}`);
  }
}

export function Game() {
  const [gameState, setGameState] = useState(GameState.START);
  return <GamePhase state={gameState} setState={setGameState}/>;
}