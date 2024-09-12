import { Optional } from "@/app/components/phases/constants";
import { Book } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type Author = {name: string, birth_year: Optional<string>, death_year: Optional<string>};
type GutenBook = { title: string, authors: Author[], subjects: string[]}

function getAuthorString(author: Author) {
  if (!author.birth_year) {
    return author.name;
  }
  return `${author.name} (${author.birth_year} - ${author.death_year ? author.death_year : ''})`
}

export async function GET(req: NextRequest): Promise<NextResponse<Book[] | string>> {
  try {
    const searchTerm = req.nextUrl.searchParams.get('term');
    console.log(`https://gutendex.com/books?search=${searchTerm}`);
    const response = await fetch(`https://gutendex.com/books?search=${searchTerm}`);
    const responseJson = await response.json();
    const books = responseJson.results.map((book: GutenBook) => ({
      title: book.title,
      authors: book.authors.map((author: Author) => getAuthorString(author)).join(', '),
      subjects: book.subjects.filter((subject: string) => !subject.includes('--')).join(' • '),
    }));
    return NextResponse.json(books, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error as string, {status: 500});
  } 
}