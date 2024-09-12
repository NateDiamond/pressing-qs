# 20 Pressing Questions

The AI-powered guessing game for book nerds. This project uses [Gutendex](gutendex.com), an open-source API for [The Gutenberg Project](gutenberg.org). The project also uses OpenAI's API as the AI for guessing the player's selection.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game run locally.

### Environment Variables

Create a `.env` file in the root of the project with the following variables:
```bash
OPENAI_API_KEY=<your openai api key goes here>
POSTGRES_URL=postgresql://<user-name>@localhost:5432/<db-name>
```
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to set your environment variables! Database URL will be set up with whatever Vercel uses for its Postgres store. 