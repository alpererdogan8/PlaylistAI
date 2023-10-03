/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useContextApi from "@/context/ContextApi";

interface IMusicItem {
  music: string;
  artist: string;
  image: object[];
  previewUrl: string;
  uri: string;
}
interface TMusicAudio {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

type TComponentProp = {
  index: number;
} & IMusicItem &
  TMusicAudio;

export function MusicItem({
  index,
  music,
  artist,
  image,
  previewUrl,
  uri,
  isPlaying,
  onPlay,
  onPause,
}: TComponentProp) {
  const { state, dispatch } = useContextApi();
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("ended", () => {
        onPause();
        ref.current?.pause();
      });
      return () => {
        onPause();
        ref.current?.pause();
      };
    }
  }, [ref]);

  const handlePlay = () => {
    const audios = document.querySelectorAll<HTMLAudioElement>("audio");
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      if (isPlaying) onPause();
    });

    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
        ref.current.currentTime = 0;
        onPause();
      } else {
        ref.current.play();
        onPlay();
      }
    }
  };
  const handleDelete = (id: number) => {
    dispatch({
      type: "SUCCESS",
      payload: { data: state.data.filter((_, index: number) => index !== id), isTrue: true },
    });
  };
  return (
    <div className="p-3 w-[24.88rem] md-10 md:m-0  max-w-[27rem] h-auto gap-3 drop-shadow-md dark:drop-shadow-2xl min-h-[7.75rem] bg-gradient-to-b from-slate-700 to-slate-900 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900   text-white rounded-[0.50rem] flex items-center">
      <div className="group w-auto h-auto shrink-0 flex justify-center items-center p-0 hover:flex">
        <Button
          onClick={handlePlay}
          className={` ${
            isPlaying ? "flex" : "hidden"
          }  group-hover:flex cursor-pointer absolute w-[6.5rem] h-[6.5rem]  rounded-[0.50rem] justify-center items-center hover:bg-slate-900/30 bg-slate-900/30 `}>
          <audio ref={ref}>
            <source src={previewUrl} type="audio/mp3" />
          </audio>
          {isPlaying ? (
            <PauseIcon width={"48px"} height={"48px"} radius={"10px"} />
          ) : (
            <PlayIcon width={"48px"} height={"48px"} radius={"10px"} />
          )}
        </Button>
        {image && image.length > 0 ? (
          <Image
            className="self-start bg-red-500 w-[6.5rem] h-[6.5rem] shrink-0 rounded-[0.50rem]"
            //@ts-ignore
            src={image[0]?.url}
            //@ts-ignore
            width={image[0]?.width}
            //@ts-ignore
            height={image[0]?.height}
            alt={"s"}
          />
        ) : null}
      </div>
      <div className="w-full flex flex-col justify-stretch items-start">
        <header className="font-semibold text-[1.60rem] -tracking-wider">{music}</header>
        <section className="font-medium text-lg -tracking-wider">{artist}</section>
        <footer className="self-end ">
          <Button
            onClick={() => handleDelete(index)}
            className="bg-[#f53f3f] hover:bg-[#9e1818] w-[6.38rem] h-[2.13rem] rounded-[0.50rem] ">
            Remove
          </Button>
        </footer>
      </div>
    </div>
  );
}
