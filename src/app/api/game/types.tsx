import { Game, Round } from "@prisma/client"

export type GameWithRounds = Game & {
  rounds: Round[]
}