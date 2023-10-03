import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

function jsonToCsv(jsonData: any): string {
  const csvData: string[] = [];
  const header: string[] = Object.keys(jsonData[0]);
  csvData.push(header.join(","));
  jsonData.forEach(function (item: any) {
    const row: string[] = [];
    header.forEach(function (key) {
      row.push(item[key]);
    });
    csvData.push(row.join(","));
  });

  return csvData.join(",");
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { token } = await req.json();

    // For now not accesible offset(range) parameter because of api limitation
    // const limit = Number(req.nextUrl.searchParams.get("limit")) || 50;
    // const range = Number(req.nextUrl.searchParams.get("range")) || 100;
    const csv: boolean = req.nextUrl.searchParams.get("csv") === "true" ? true : false;

    const limit = 50;
    const range = 200;
    const getPlaylistLimitAndOffset = async (limit: number, offset: number = 0) => {
      const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token || session?.access_token}`,
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    };
    if (limit >= 50) {
      const trackList: any[] = [];
      for (let i = 0; i < range; i += limit) {
        const playlist = await getPlaylistLimitAndOffset(limit, i);
        trackList.push(playlist);
      }

      const newTrackList = trackList
        .map((track: any) => {
          if (csv) {
            return track.items.map((item: any) => {
              return { music: item.track.name, artist: item.track.artists[0].name };
            });
          }
          return track.items.map((item: any) => {
            return {
              music: item.track.name,
              artist: item.track.artists[0].name,
              image: item.track.album.images,
              previewUrl: item.track.preview_url,
              uri: item.track.uri,
            };
          });
        })
        //The reduce method regularly lists multiple objects in an array under a single object

        .reduce((acc, curr) => acc.concat(curr), []);

      return NextResponse.json(csv ? jsonToCsv(newTrackList) : newTrackList);
    }
    const result = await getPlaylistLimitAndOffset(limit, 0);
    const json = result.items.map((item: any) => {
      return { music: item.track.name, artist: item.track.artists[0].name };
    });
    return NextResponse.json(jsonToCsv(json));
  } catch (error) {
    return NextResponse.json(error);
  }
}
