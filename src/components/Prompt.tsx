/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Suspense, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { exampleList } from "@/lib/prompt_examples";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import useContextApi from "@/context/ContextApi";
import Button from "./Button";
import { Skeleton } from "./ui/skeleton";
export function Prompt() {
  const [examplePrompts, setExamplePrompts] = useState<string>("Create a rap playlist");

  const session = useSession();
  const { dispatch, getPlaylists } = useContextApi();
  type TRateLimit = { X_RateLimit_Remaining: string; X_RateLimit_Reset?: string };
  const [rateLimit, setRateLimit] = useState<TRateLimit>();
  const [humanizeTime, setHumanizeTime] = useState<string>();

  const { handleInputChange, handleSubmit, input, messages, isLoading } = useChat({
    api: "/api/prompt",
    headers: {
      "Content-Type": "application/json",
    },
    onResponse(response) {
      const remaining = response.headers.get("X-RateLimit-Remaining")!;
      const reset = response.headers.get("X-RateLimit-Reset")!;
      setRateLimit({ X_RateLimit_Remaining: remaining, X_RateLimit_Reset: reset });
    },
    body: { token: session.data?.access_token },
    initialMessages: [
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "",
      },
    ],
  });
  useEffect(() => {
    const exampleLoop = setInterval(() => {
      const random = Math.floor(Math.random() * exampleList.length);
      setExamplePrompts(`Create a ${exampleList[random]} playlist`);
    }, 1800);
    return () => clearInterval(exampleLoop);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplePrompts]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  useEffect(() => {
    if (messages.slice(-1)[0].content !== "") {
      (async () => setSelectedTracks(await getPlaylists({ csv: false })))();
      const result = messages
        .slice(-1)[0]
        .content.replace("[", "")
        .replace("]", "")
        .split(",")
        .map((title) => title.trim().replace(/'/g, ""))
        .filter((song) => {
          return selectedTracks.some((obj: any) => obj.music === song);
        })
        .map((song: any) => {
          const matchingObject: any = selectedTracks.find((obj: any) => obj.music === song);
          return {
            music: matchingObject.music,
            artist: matchingObject.artist,
            image: matchingObject.image,
            previewUrl: matchingObject.previewUrl,
            uri: matchingObject.uri,
          };
        });
      dispatch({
        type: "SUCCESS",
        payload: {
          data: result,
          isTrue: isLoading ? false : true,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, messages]);

  useEffect(() => {
    if (rateLimit?.X_RateLimit_Remaining === "0") {
      const createdAt = Number(rateLimit.X_RateLimit_Reset);
      const intervalId = setInterval(() => {
        const now = new Date();
        const remainingTime = Math.max(createdAt - now.getTime(), 0);

        if (remainingTime === 0) {
          clearInterval(intervalId);
          setRateLimit({ X_RateLimit_Remaining: "2" });
        } else {
          const remainingHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const remainingMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const remainingSeconds = Math.floor((remainingTime / 1000) % 60);
          const formattedTime = `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

          setHumanizeTime(formattedTime);
        }
      }, 1000);
    }
  }, [rateLimit]);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-11/12 md:w-8/12  max-w-[900px] m-2 animate-down-to-up h-auto flex items-start justify-end ">
      <div className="w-full flex flex-col">
        {rateLimit?.X_RateLimit_Reset !== "0" ? (
          <Input
            type="text"
            name="prompt"
            className="w-full h-[53px] border-slate-700 border-2 focus:border-2 focus:drop-shadow-xl focus:border-slate-700 focus:outline-none dark:focus:border-primary dark:focus:border-2 dark:transition-none transition-all text-secondary-foreground font-semibold text-lg -tracking-wider rounded-[0.625rem]"
            placeholder={examplePrompts}
            onChange={handleInputChange}
            value={input}
            disabled={typeof rateLimit === "string" ? true : isLoading}
          />
        ) : (
          <Skeleton className="w-full h-[53px] border-2 focus:border-2 focus:drop-shadow-xl focus:border-slate-700 focus:outline-none dark:focus:border-primary dark:focus:border-2 dark:transition-none transition-all text-secondary-foreground font-semibold text-lg -tracking-wider rounded-[0.625rem]" />
        )}
        <Suspense fallback={<Skeleton className="w-44 h-5" />}>
          {rateLimit?.X_RateLimit_Remaining !== "0" ? (
            <>
              {rateLimit ? (
                <div className={`${rateLimit.X_RateLimit_Remaining === "1" ? "text-red-500" : ""} ml-1 mt-2`}>
                  You have {rateLimit.X_RateLimit_Remaining} remaining
                </div>
              ) : (
                <Skeleton className="w-44 h-5  ml-1 mt-2" />
              )}
            </>
          ) : (
            <>
              {rateLimit ? (
                <span className="ml-1 mt-2"> {humanizeTime} left to recreate a playlist</span>
              ) : (
                <Skeleton className="w-44 h-5  ml-1 mt-2" />
              )}{" "}
            </>
          )}
        </Suspense>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        className="absolute mr-[7px] w-[125px] mt-[5.2px] rounded-[0.438rem]  bg-black dark:text-black dark:bg-white dark:hover:bg-[#11d43c] leading-3 dark:hover:text-white">
        Generate
      </Button>
    </form>
  );
}
