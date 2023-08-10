import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  const music = await req.json();
  const session = await getServerSession(authOptions);
  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify(music),
  });
  return NextResponse.json(res);
}
