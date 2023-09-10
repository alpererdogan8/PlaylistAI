import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse, streamToResponse } from "ai";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";
const systemPrompt = `Translate from English to Turkish`;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const combineMessage = [...messages, { role: "system", content: systemPrompt }];

  const response = await openai.createChatCompletion({
    max_tokens: 150,
    model: "gpt-3.5-turbo-16k",
    messages: combineMessage.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
    stream: true,
  });
  const stream = await OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
