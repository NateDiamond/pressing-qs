import { Book } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function getAuthorString(author: any) {
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
    const books = responseJson.results.map((book: any) => ({
      title: book.title,
      authors: book.authors.map((author: any) => getAuthorString(author)).join(', '),
      subjects: book.subjects.filter((subject: any) => !subject.includes('--')).join(' • '),
    }));
    return NextResponse.json(books, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error as string, {status: 500});
  } 
}