import { Round } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import PRISMA_CLIENT from "../../../../../prisma/prisma";
import { getQuestion } from "../openai";

export async function GET(req: NextRequest): Promise<NextResponse<Round | string>> {
  try {
    const gameId = req.nextUrl.searchParams.get("id");
    const game = await PRISMA_CLIENT.game.findUnique({where: {id: gameId!}, include: {rounds: true}});
    const round = await getQuestion(game!);
    return NextResponse.json(round, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error as string, {status: 500});
  }
}