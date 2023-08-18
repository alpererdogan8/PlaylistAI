import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const limit = req.nextUrl.searchParams.get("limit") ?? 1;
  const offset = req.nextUrl.searchParams.get("offset") ?? 0;
  const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
  });
  const mappedResponse = await res.json();

  const result = mappedResponse?.items?.map((item: any) => {
    return {
      id: item.track.id,
      name: item.track.name,
      artistsName: item?.track?.artists?.map((names: { name: string }) => names?.name),
      trackImage: item.track.album.images,
      previewTrack: item.track.preview_url,
    };
  });

  return NextResponse.json(result);
}
