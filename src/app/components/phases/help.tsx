import { GameButton } from "../button";
import { GameState, SetGameState } from "./constants";

type HelpProps = {setState: SetGameState};

export function Help({setState}: HelpProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full md:w-3/4 bg-slate-200 border-black border-2 p-4 rounded-lg">
        <div className="font-mono p-4">
          Welcome to 20 PQ - an AI-powered game of 20 Questions for book nerds! <br/>
          Pick from 70,000 books from the <a className="text-blue-600" href="https://www.gutenberg.org/">Gutenberg Project</a> and try to stump our AI. <br/>
          It&apos;s best if you are familiar with the book, but if you&apos;re not you&apos;re welcome to pick one at random and use Wikipedia or your own AI to answer the questions. <br/>
          To get started, simply press the &quot;Back&quot; button below and then click &quot;Start&quot; when you&apos;re ready.
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <GameButton classNames="hover:bg-red-600 hover:text-slate-200 p" onPress={() => setState(GameState.START)}>Back</GameButton>
      </div>
    </div>   
  )
}