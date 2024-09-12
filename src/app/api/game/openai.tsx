import { Round } from "@prisma/client";
import { OpenAI } from 'openai';
import PRISMA_CLIENT from "../../../../prisma/prisma";
import { GameWithRounds } from "./types";

const OPENAI_CLIENT = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function summarizeRounds(rounds: Round[]) {
  if (rounds.length === 0) {
    return "There is no history, the game is just starting."
  }
  const roundSummaries = []
  for (var i = 0; i < rounds.length; i ++) {
    const round = rounds[i];
    roundSummaries.push(`
      Round ${i+1}: You asked the following prompt:
      ${round.question}
      You gave the following options:
      ${round.options}
      The player chose the following option:
      ${round.answer}

    `);
  }
  return roundSummaries.join('');
}

export function formatNormalPrompt(rounds: Round[]): string {
  const roundSummaries = summarizeRounds(rounds);
  const prompt = `
    You are playing a 20 Question game where you are trying to guess a book that a user has selected from The Gutenberg Project (gutenberg.org). 
    These books are all in the public domain.
    Your right now is to make a unique question that will give you more information about the book.
    Thus far, the game has the following history:
    ${roundSummaries}
    Please return a json object in the following format (only one JSON for the current round that can be parsed in Javascript with JSON.parse):
    { "question": "Your question goes here", "options": [<your array here>]}
    The following conditions must be true:
    question is of type string and is not a duplicate of a question from a previous round
    options is an array of at most length 4 
    options must include an option of "Other" and "I don't know".
  `
  return prompt;
}

export function formatGuessPrompt(rounds: Round[]): string {
  const roundSummaries = summarizeRounds(rounds);
  const prompt = `
    You are making a guess for the title of a book that a user has selected from The Gutenberg Project (gutenberg.org). 
    These books are all in the public domain.
    Thus far, the game has the following history:
    ${roundSummaries}
    Please return a json object of a guess in the following format (only one JSON for the current round that can be parsed in Javascript with JSON.parse):
    { "question": "Your question goes here", "options": ["Yes", "No"]}
    The question must be guessing the title of a book. The question can not be a duplicate of a previous round. Do not try to guess the author or other information about the book, just guess the title.
    The options array must have two values: ["Yes", "No"].
  `
  return prompt;
}

export async function getQuestion(game: GameWithRounds): Promise<Round> {
  let prompt;
  const isGuess = game.rounds.length === 19 || game.rounds.length > 5 && Math.random()*5 < 1;
  if (isGuess) {
    prompt = formatGuessPrompt(game.rounds);
  } else {
    prompt = formatNormalPrompt(game.rounds)
  }
  const response = await OPENAI_CLIENT.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt}],
  });
  const message = response.choices[0].message.content!;
  console.log(`Got a message of ${message}`);
  const round = JSON.parse(message);
  const roundWithId = await PRISMA_CLIENT.round.create({
    data: {
      ...round,
      guess: isGuess,
      gameId: game.id
    }
  })
  return roundWithId;
}
