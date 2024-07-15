import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter, StreamingTextResponse } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt, todo } = await req.json();

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo-0125",
    apiKey: process.env.OPENAI_API_KEY!,
    temperature: 0,
  });

  let instructions:string ;

  const stream = await model.stream(prompt);

  const aiStream = LangChainAdapter.toAIStream(stream);

  return new StreamingTextResponse(aiStream);
}
