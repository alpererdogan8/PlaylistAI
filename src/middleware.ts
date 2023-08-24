import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
});

export const config = {
  matcher: ["/api/prompt/:path*"],
};

export default async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit("api");

  return success ? NextResponse.next() : NextResponse.redirect(new URL("/blocked", request.url));
  return NextResponse.next();
}
