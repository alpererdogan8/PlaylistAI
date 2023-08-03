import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

type TRequest = { name: string; description: string; public: boolean };

export async function POST(request: Request) {
  const req: TRequest = await request.json();
  const session = await getServerSession(authOptions);
  const res = await fetch(`https://api.spotify.com/v1/users/${session?.user?.id}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  return NextResponse.json(await res.json());
}
