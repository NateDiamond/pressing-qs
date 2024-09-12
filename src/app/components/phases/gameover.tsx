import { GameButton } from "../button";
import { Title } from "../text";
import { GameState, SetGameState } from "./constants";

type GameOverProps = {message: string, setState: SetGameState};

export function GameOver({message, setState}: GameOverProps) {
  return (
    <div className="h-full flex flex-col flex-wrap justify-center items-center gap-4 px-4">
      <Title>
        {message}
      </Title>
      <GameButton classNames="w-full sm:w-1/2 md:w-1/4" onPress={() => setState(GameState.START)}>
        Home
      </GameButton>
    </div>
  );
}