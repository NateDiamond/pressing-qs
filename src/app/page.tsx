"use client";

import { Game } from "./components/game";
import { MainTitle } from "./components/text";

export default function Home() {
  return (
    <div className="flex min-w-screen min-h-screen p-4 sm:p-20 bg-gradient-to-br from-blue-300 to-red-600">
      <div className="w-full bg-slate-200 p-2 sm:p-10 bg-gradient-to-l from-slate-200 to-slate-400 border-black border-4 rounded-lg">
        <div className="h-full flex flex-col gap-4">
          <MainTitle />
          <div className="grow">
            <Game/>
          </div>
        </div>
      </div> 
    </div> 
  );
}
