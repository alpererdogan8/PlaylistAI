"use client";
import { GeneratedList } from "@/components/GeneratedList";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Prompt } from "@/components/Prompt";
import { Skeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { refreshAccessToken } from "../api/auth/[...nextauth]/route";

type IGetPlaylist = Record<string, string | number>;

const getPlaylist = async ({ token, limit, offset }: IGetPlaylist) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tracks/me?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createPlaylistFetch = async (token: string) => {
  const dene = await fetch(`http://localhost:3000/api/playlist/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "alper'in playlisti",
      description: "erdogan'ın playlisti",
      public: false,
    }),
  });
  const result = await dene.json();
  return result;
};
const addTrackFetch = async (playlistId: string) => {
  const dene = await fetch(`http://localhost:3000/api/playlist/${playlistId}/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: ["spotify:track:1iaCXdnlc1QPpktPidJm9h"],
      position: 0,
    }),
  });
  const result = await dene.json();
  return result;
};

const Page = () => {
  const [deneFetch, setDeneFetch] = useState([]);
  const { data, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") {
      signIn("spotify");
    }
  }, [data]);

  async function createPlaylist() {
    const dene = await createPlaylistFetch(data?.access_token!);
    setDeneFetch(dene);
  }

  async function addTrack() {
    const dene = await addTrackFetch("6ukD7s3DB6rsna5CZGJEvG");
    setDeneFetch(dene);
  }

  const [myPlaylist, setMyPlaylist] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPlaylist() {
      const res = await getPlaylist({ token: data?.access_token!, limit: 10, offset: 0 });

      setMyPlaylist([...myPlaylist, res]);
    }
    fetchPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.access_token]);

  return (
    // min-h-[calc(100dvh+185px)] h-auto
    <div className="flex flex-col w-full items-center">
      {/* <Suspense fallback={<Skeleton />}>
        <Prompt />
        <PlaylistCard />
        <GeneratedList />
      </Suspense> */}
      {/* <pre className="whitespace-pre-wrap">{JSON.stringify({ status }, null, 2)}</pre> */}
      {/* <pre className="whitespace-pre-wrap">{JSON.stringify({ myPlaylist }, null, 2)}</pre> */}
      <pre className="whitespace-pre-wrap">{JSON.stringify({ data }, null, 2)}</pre>
      {/* <Button onClick={createPlaylist}>Create Playlist</Button>
      <Button onClick={addTrack}>Add Music</Button>

      <Link href="spotify://playlist/7q137No7rNy7TJZ6sacDiT">Go to Spotify</Link>
      <pre className="whitespace-pre-wrap">{JSON.stringify(deneFetch)}</pre>
      <hr /> */}
    </div>
  );
};

export default Page;
