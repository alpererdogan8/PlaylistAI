import { IPlaylistCreate } from "@/lib/types/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req: IPlaylistCreate = await request.json();
  const res = await fetch(`https://api.spotify.com/v1/users/${req?.session?.id}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req?.session?.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  return NextResponse.json(await res.json());
}
