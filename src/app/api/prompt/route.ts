import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";
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

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(2, "6 h"),
});

export async function POST(request: NextRequest) {
  const { token, messages } = await request.json();
  const ip = request.ip ?? "127.0.0.1";
  const { limit, reset, remaining } = await ratelimit.limit(ip);

  if (remaining === 0) {
    const messages: Message = {
      id: new Date().getTime().toString(),
      content: "rate limit exceeded",
      role: "assistant",
      createdAt: new Date(),
    };
    return new Response(JSON.stringify(messages), {
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tracks/me?csv=true`, {
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
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    },
  });
}
