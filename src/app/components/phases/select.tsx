import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Title } from "../text";
import { Book } from "@/types";
import { backendApiCall } from "@/app/utils/backend";
import { GameState, SetBook, SetGameState, SetState } from "./constants";

type SearchBarProps = {searchTerm: string, setSearchTerm: Dispatch<SetStateAction<string>>};
type SearchCardProps = {book: Book, setState: SetGameState, setBook: SetBook};
type SelectProps = {setState: SetGameState, setBook: SetBook}

function SearchBar({searchTerm, setSearchTerm}: SearchBarProps) { 
  return (
    <input 
      className="font-mono w-full sm:w-1/2 py-2 px-4 text-lg text-black placeholder:text-blue-600 placeholder:font-caveat border-2 border-black rounded-lg"
      value={searchTerm} 
      onChange={(event) => setSearchTerm(event.target.value)} 
      type="text" 
      placeholder="Search Gutenberg's Library..." 
    />
  )
}

function SearchCard({book, setState, setBook}: SearchCardProps) {
  return (
    <div className="p-2 w-full md:w-1/2 lg:w-1/4" onClick={() => {
      setBook(book);
      setState(GameState.QUESTIONS);
    }}>
      <div className="p-2 flex flex-col justify-between text-center bg-white h-full rounded-lg border-blue-300 border-2 hover:bg-red-200 hover:text-slate-700 cursor-pointer">
        <div>
          <Title classNames="py-2">
            {book.title}
          </Title>
          <div className="font-mono">
            {book.authors}
          </div>
        </div>
        <div className="text-xl text-wrap">
          {book.subjects}
        </div>
      </div>
    </div>
    
  )
}

export function Select({setState, setBook}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  async function updateSearch(searchTerm: string) { 
    clearTimeout(searchTimeout);
    const searchRequest = setTimeout(async (searchTerm) => setSearchResults(await backendApiCall('search', 'GET', `term=${searchTerm}`)), 500, searchTerm);
    setSearchTimeout(searchRequest);
  } 

  useEffect(() => {
    updateSearch(searchTerm);
  }, [searchTerm])

  return (
    <div className="flex flex-col bg-slate-200 border-2 border-black rounded-lg p-4">
      <Title>Select A Book</Title>
      <div className="flex flex-row justify-center p-2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch">
        {
          searchResults.map(book => (
            <SearchCard key={book.title} book={book} setState={setState} setBook={setBook}/>
          ))
        }
      </div>
    </div>
  )
  
}