"use client";
import { GeneratedList } from "@/components/GeneratedList";
import Loading from "@/components/Loading";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Prompt } from "@/components/Prompt";
import useContextApi from "@/context/ContextApi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense, useEffect } from "react";
const Page = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const { getPlaylists, state } = useContextApi();
  useEffect(() => {
    (async () => {
      getPlaylists({ csv: true });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col w-full items-center">
      <Prompt />
      <PlaylistCard />
      <Suspense fallback={<Loading />}>{typeof state.data === "object" ? <GeneratedList /> : state.data}</Suspense>
    </div>
  );
};

export default Page;
