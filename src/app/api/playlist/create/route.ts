import { IPlaylistCreate } from "@/lib/types/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const requestBody: IPlaylistCreate = await request.json();
  const res = await fetch(`https://api.spotify.com/v1/users/${session?.user.id}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return NextResponse.json(await res.json());
}
