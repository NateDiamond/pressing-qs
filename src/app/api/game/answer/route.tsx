import { NextRequest, NextResponse } from "next/server";
import PRISMA_CLIENT from "../../../../../prisma/prisma";

export async function GET(req: NextRequest): Promise<NextResponse<string>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const roundId = searchParams.get("id");
    const answer = searchParams.get("answer");
    await PRISMA_CLIENT.round.update({
      where: {id: roundId!},
      data: {
        answer: answer!
      }
    });
    return NextResponse.json("success", {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error as string, {status: 500});
  }
}