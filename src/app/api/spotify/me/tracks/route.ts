import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=2&offset=1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`, // Token başlığı ekleniyor
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(await res.json());
}
