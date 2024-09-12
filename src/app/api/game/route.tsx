import { NextResponse } from "next/server";
import PRISMA_CLIENT from "../../../../prisma/prisma"

export async function GET(): Promise<NextResponse<string>> {
  try {
    const game = await PRISMA_CLIENT.game.create({data: {}});
    return NextResponse.json(game.id, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(error as string, {status: 500});
  }
}