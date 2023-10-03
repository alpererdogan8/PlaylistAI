"use client";
import { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import TextareaAutosize from "react-textarea-autosize";
import useContextApi from "@/context/ContextApi";
import { IPlaylistCreate } from "@/lib/types/types";
import Button from "./Button";

export function PlaylistCard() {
  const { createPlaylist, state } = useContextApi();

  const [playlistInfo, setPlaylistInfo] = useState<IPlaylistCreate>({
    name: "My AI Mix",
    description: "Songs you like edited by gpt",
    isPublic: false,
  });

  return (
    <Card className="animate-down-to-up flex flex-col sm:flex-row w-11/12 md:w-8/12  max-w-[900px] m-8 drop-shadow-xl h-auto p-2 border-2 border-slate-700  dark:border-border">
      <div
        className={` ${
          !state.isPromptAvailable ? "bg-slate-500 text-black/60" : "bg-primary text-[#23FF53]"
        } rounded-lg w-full h-[13.25rem] sm:w-[15.63rem] shrink-0 md:h-[15.25rem] pt-5 pl-5 text-4xl`}>
        Playlist AI
      </div>
      <div className="p-2 w-full flex flex-col justify-between">
        <CardHeader className="flex p-0 flex-row justify-between">
          <div className="mb-10 md:mb-0">
            <CardTitle className="text-4xl">
              <TextareaAutosize
                disabled={!state.isPromptAvailable}
                maxRows={4}
                className={`${
                  !state.isPromptAvailable ? "" : "hover:underline "
                } w-11/12 lg:w-full lg:max-w-2xl  bg-transparent resize-none scroll overflow-hidden outline-none underline-offset-2`}
                value={playlistInfo.name}
                onChange={(e: any) => setPlaylistInfo({ ...playlistInfo, name: e.target.value })}
              />
            </CardTitle>
            <CardDescription className="text-xl">
              <TextareaAutosize
                disabled={!state.isPromptAvailable}
                maxRows={4}
                className={`${
                  !state.isPromptAvailable ? "" : "hover:underline "
                }  w-11/12 lg:w-full lg:max-w-2xl  bg-transparent resize-none scroll overflow-hidden outline-none underline-offset-2`}
                value={playlistInfo.description}
                onChange={(e: any) => setPlaylistInfo({ ...playlistInfo, description: e.target.value })}
              />
            </CardDescription>
          </div>
          <div className="hidden lg:flex justify-between space-x-2">
            <span>Public</span>
            <Switch
              disabled={!state.isPromptAvailable}
              onCheckedChange={() => setPlaylistInfo({ ...playlistInfo, isPublic: !playlistInfo.isPublic })}
              className="data-[state=checked]:bg-[#23FF53] bg-[#23FF53]"
              checked={playlistInfo.isPublic}
            />
          </div>
        </CardHeader>

        <CardFooter className=" w-full  p-0 flex flex-row justify-between lg:justify-end">
          <div className="flex lg:hidden justify-between md:justify-end space-x-2">
            <span>Public</span>
            <Switch
              disabled={!state.isPromptAvailable}
              onCheckedChange={(e: any) => setPlaylistInfo({ ...playlistInfo, isPublic: !playlistInfo.isPublic })}
              className="data-[state=checked]:bg-[#23FF53] mx-3 bg-[#23FF53]"
              checked={playlistInfo.isPublic}
            />
          </div>
          <Button
            type="button"
            isLoading={state.loading}
            onClick={() => createPlaylist(playlistInfo)}
            disabled={!state.isPromptAvailable}
            className="bg-black   dark:text-black dark:bg-white dark:hover:bg-primary dark:hover:text-white">
            Create Playlist
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
