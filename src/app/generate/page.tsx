"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const getPlaylist = async ({ token }: { token: string }) => {
  const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=1&offset=0`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const Page = () => {
  const { data, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    async function fetchPlaylist() {
      const res = await getPlaylist({ token: data?.access_token! });
      setMyPlaylist(await res);
    }
    fetchPlaylist();
  }, [data?.access_token]);

  return (
    <>
      <pre className="whitespace-pre-wrap w-7/12">{JSON.stringify({ myPlaylist }, null, 2)}</pre>
      <pre className="whitespace-pre-wrap">{JSON.stringify({ data: data?.access_token }, null, 2)}</pre>
      <hr />
    </>
  );
};

export default Page;