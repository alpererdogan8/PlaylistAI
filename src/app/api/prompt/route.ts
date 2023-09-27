import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";
const systemPrompt = (text: string) => {
  return `I want you to act like a music classifier, I give you a list of music between three hyphens (csv), I give you a hint on how to organize it and it is limited to three backslashes.

  Rules you need to know:
  
-When answering the question, the answer *must* be in square brackets, for example "['music1','music2','music3']"
-You only categorize music and nothing else, so any false request other than playlists and music should be answered *I categorize music* and it should be returned as *string*
  -When categorizing music, look for criteria such as music genre, language, artist name, etc. *if you know them*. If it does not meet most of these criteria and you are *not sure*, please do not include the music in the list
-Return your request response with only *music name* in the array.
---${text}---`;
};

export async function POST(request: Request) {
  const { token, messages } = await request.json();

  const res = await fetch("http://localhost:3000/api/tracks/me?csv=true", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
  const playlist = await res.json();
  const content = systemPrompt(playlist);

  const combineMessage = [...messages, { role: "system", content }];
  const response = await openai.createChatCompletion({
    max_tokens: 1000,
    frequency_penalty: 0.8,
    presence_penalty: 0.8,
    temperature: 0.7,
    model: "gpt-3.5-turbo-16k-0613",
    messages: combineMessage.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
    stream: true,
  });
  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream, {
    headers: {
      "X-RateLimit-Remaining": request.headers.get("X-RateLimit-Remaining")!,
      "X-RateLimit-Limit": request.headers.get("X-RateLimit-Limit")!,
      "X-RateLimit-Reset": request.headers.get("X-RateLimit-Reset")!,
    },
  });
}
