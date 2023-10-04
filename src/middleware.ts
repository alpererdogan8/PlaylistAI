import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(2, "5 m"),
});

export const config = {
  matcher: ["/api/prompt/:path*", "/generate"],
};
export default async function middleware(request: NextRequest) {
  let response: any = NextResponse.next();
  if (request.method === "POST" && request.nextUrl.pathname.startsWith("/api/prompt")) {
    const ip = request.ip ?? "127.0.0.1";
    const { success, remaining, reset } = await ratelimit.limit(ip);

    if (remaining === 0) {
      response.cookies.set("X-RateLimit-Reset", reset.toString());
    } else {
      response.cookies.delete("X-RateLimit-Reset");
    }
    response.cookies.set("X-RateLimit-Remaining", remaining.toString());

    if (!success) {
      response = response = new Response("Too Many Requests", { status: 429 });
      return response;
    }
    return response;
  }
  if (request.method === "GET" && request.nextUrl.pathname.startsWith("/generate")) {
    if (typeof request.cookies.get("X-RateLimit-Remaining")?.value === "undefined") {
      const remainingToken = 2;
      response.cookies.get("X-RateLimit-Remaining") ??
        response.cookies.set("X-RateLimit-Remaining", remainingToken.toString());

      return response;
    }
    if (Number(request.cookies.get("X-RateLimit-Remaining")?.value) === 0) {
      const reset = request.cookies.get("X-RateLimit-Reset")?.value;
      const targetTime = new Date(Number(reset));
      targetTime.setHours(targetTime.getHours() + 1);
      const now = new Date();
      if (targetTime.getTime() < now.getTime()) {
        const remainingToken = 2;
        response.cookies.set("X-RateLimit-Remaining", remainingToken.toString());
        return response;
      }
    }
    return response;
  }
}
