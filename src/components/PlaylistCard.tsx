"use client";
import { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";

type TPlaylistInfo = {
  name?: string;
  description?: string;
  public?: true | false;
};

export function PlaylistCard() {
  const [playlistInfo, setPlaylistInfo] = useState<TPlaylistInfo>({
    name: "Playlist AI",
    description: "Songs you like edited by gpt",
    public: false,
  });

  return (
    <Card className="flex flex-col sm:flex-row w-11/12 md:w-8/12  max-w-[900px] m-8 drop-shadow-xl h-auto p-2 ">
      <div className="bg-primary rounded-lg  text-[#23FF53] w-full h-[13.25rem] sm:w-[15.63rem] shrink-0 md:h-[15.25rem] pt-5 pl-5 text-4xl">
        Playlist AI
      </div>
      <div className="p-2 w-full flex flex-col justify-between">
        <CardHeader className="flex p-0 flex-row justify-between">
          <div className="mb-10 md:mb-0">
            <CardTitle className="text-4xl  ">
              <TextareaAutosize
                maxRows={4}
                className=" w-11/12  lg:w-full lg:max-w-2xl  bg-transparent resize-none scroll overflow-hidden outline-none hover:underline underline-offset-2"
                value={playlistInfo.name}
                onChange={(e: any) => setPlaylistInfo({ ...playlistInfo, name: e.target.value })}
              />
            </CardTitle>
            <CardDescription className="text-xl">
              <TextareaAutosize
                maxRows={4}
                className="w-11/12 lg:w-full lg:max-w-2xl  bg-transparent resize-none scroll overflow-hidden outline-none hover:underline underline-offset-2"
                value={playlistInfo.description}
                onChange={(e: any) => setPlaylistInfo({ ...playlistInfo, description: e.target.value })}
              />
            </CardDescription>
          </div>
          <div className="hidden lg:flex justify-between space-x-2">
            <span>Public</span>
            <Switch
              onCheckedChange={() => setPlaylistInfo({ ...playlistInfo, public: !playlistInfo.public })}
              className="data-[state=checked]:bg-[#23FF53] bg-[#23FF53]"
              checked={playlistInfo.public}
            />
          </div>
        </CardHeader>

        <CardFooter className=" w-full  p-0 flex flex-row justify-between lg:justify-end">
          <div className="flex lg:hidden justify-between md:justify-end space-x-2">
            <span>Public</span>
            <Switch
              onCheckedChange={(e: any) => setPlaylistInfo({ ...playlistInfo, public: !playlistInfo.public })}
              className="data-[state=checked]:bg-[#23FF53] mx-3 bg-[#23FF53]"
              checked={playlistInfo.public}
            />
          </div>
          <Button className=" bg-black dark:text-black dark:bg-white dark:hover:bg-primary dark:hover:text-white">
            Create Playlist
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
