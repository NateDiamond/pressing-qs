import { Book } from "@/types";
import { useEffect, useState } from "react";
import { Title } from "../text";
import { backendApiCall } from "@/app/utils/backend";
import { Round } from "@prisma/client";
import { GameButton } from "../button";
import { GameState, Optional, SetGameState, SetState } from "./constants";

type QuestionsProps = {book: Book, setState: SetGameState, setMessage: SetState<Optional<string>>};

const optionColors = [
  "hover:bg-lime-600",
  "hover:bg-red-600",
  "hover:bg-blue-600",
  "hover:bg-orange-600",
]

export function Questions({book, setState, setMessage}: QuestionsProps) {
  const [gameId, setGameId] = useState(undefined);
  const [round, setRound] = useState<Round | undefined>(undefined);
  const [roundNumber, setRoundNumber] = useState(1);
  const [questionVisible, setQuestionVisible] = useState(false);

  async function initGame() {
    const gameId = await backendApiCall('game');
    setGameId(gameId);
    setRound(await backendApiCall(`game/question?id=${gameId}`));
    setQuestionVisible(true);
  } 

  async function handleOnPress(option: string) {
    setQuestionVisible(false);
    await backendApiCall(`game/answer?id=${round!.id}&answer=${option}`);
    setRoundNumber(roundNumber + 1);
    if (round!.options.length === 2 && option === 'Yes') {
      setMessage('Tough luck - AI was smart enough to guess your selection!');
      setState(GameState.GAMEOVER);
      return;
    }
    if (roundNumber === 20) {
      setMessage('Wow! You stumped the AI! Nice going!');
      setState(GameState.GAMEOVER);
      return;
    }
    
    setRound(await backendApiCall(`game/question?id=${gameId}`));
    setQuestionVisible(true);
  }

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="h-full flex flex-col justify-between items-center bg-slate-200 border-2 border-black rounded-lg p-4">
      <Title>{`Round #${roundNumber}`}</Title>
      {
        round ?
        <div className={`flex flex-col m-4 ${questionVisible ? 'transition-opacity duration-500' : 'transition-opacity duration-500 opacity-0'}`}>
          <div className="bg-white border-black border-2 rounded-lg p-4 text-center text-3xl text-wrap">
            {round.question}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 py-4">
            {round.options.map((option, index) => (
              <GameButton key={option} classNames={`min-w-60 hover:shadow-xl hover:text-slate-200 ${optionColors[index]}`} onPress={(event: React.MouseEvent<HTMLButtonElement>) => handleOnPress((event.target as HTMLButtonElement).value)}>{option}</GameButton>
            ))}
          </div>
        </div>
        : "Loading..."
      }
      <div className="flex flex-row flex-wrap justify-center">
        <a className="font-mono font-bold text-lg">Your Selection: </a><a className="text-2xl">{book.title}</a>
      </div>
    </div>
  )
}