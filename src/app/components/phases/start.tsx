import { Dispatch, SetStateAction } from "react";
import { GameState } from "./constants";
import { GameButton } from "../button";

type StartProps = {setState: Dispatch<SetStateAction<GameState>>};

export function Start({setState}: StartProps) {
  return (
    <div className="h-full flex flex-row flex-wrap justify-center items-center gap-4">
      <GameButton onPress={() => setState(GameState.SELECT)} classNames="grow sm:max-w-60 hover:bg-blue-300 hover:text-white">Start</GameButton>
      <GameButton onPress={() => setState(GameState.HELP)}classNames="grow sm:max-w-60 hover:bg-red-600 hover:text-slate-200">Help</GameButton>
    </div>
  );
}