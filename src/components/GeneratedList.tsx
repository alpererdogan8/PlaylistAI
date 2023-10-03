"use client";
import useContextApi from "@/context/ContextApi";
import { MusicItem } from "./MusicItem";
import { useState } from "react";
import Loading from "./Loading";

export function GeneratedList() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { state } = useContextApi();

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };
  const handlePause = () => {
    setPlayingIndex(null);
  };

  return (
    <section className={`${state.data.length > 0 ? "flex" : "hidden"} mb-36 w-full  flex-col items-center`}>
      <h1 className="text-4xl underline underline-offset-8 mb-10">Generated List</h1>
      <section className="flex flex-wrap justify-center gap-2 w-full">
        {state.data.length > 0 ? (
          state.data?.map((item: any, index: any) => {
            return (
              <MusicItem
                music={item.music}
                artist={item.artist}
                image={item.image}
                previewUrl={item.previewUrl}
                uri={item.uri}
                key={index}
                index={index}
                isPlaying={index === playingIndex}
                onPlay={() => handlePlay(index)}
                onPause={handlePause}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </section>
    </section>
  );
}
