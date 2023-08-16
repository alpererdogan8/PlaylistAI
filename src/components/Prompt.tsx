import { useEffect, useState } from "react";
import { PlaylistCard } from "./PlaylistCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Prompt() {
  const exampleList: string[] = [
    "Pop",
    "Rock",
    "Hip-hop",
    "Jazz",
    "Blues",
    "Country",
    "Electronic",
    "Classical",
    "R&B",
    "Reggae",
    "Metal",
    "Folk",
    "Funk",
    "Punk",
    "Indie",
    "Dance",
    "Soul",
    "Gospel",
    "Salsa",
    "Dubstep",
  ];
  const [examplePrompts, setExamplePrompts] = useState<string>("Create a rap playlist");
  useEffect(() => {
    const exampleLoop = setInterval(() => {
      const random = Math.floor(Math.random() * exampleList.length);
      setExamplePrompts(`Create a ${exampleList[random]} playlist`);
    }, 1800);
    return () => clearInterval(exampleLoop);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplePrompts]);
  return (
    <div className="w-11/12 md:w-8/12  max-w-[900px] m-2 animate-down-to-up h-auto flex items-center justify-end ">
      <Input
        type="text"
        className="w-full h-[53px] border-slate-700 border-2 focus:border-2 focus:drop-shadow-xl focus:border-slate-700 focus:outline-none dark:focus:border-primary dark:focus:border-2 dark:transition-none transition-all text-secondary-foreground font-semibold text-lg -tracking-wider rounded-[0.625rem]"
        placeholder={examplePrompts}
      />
      <Button className="absolute mr-[7px] w-[125px] rounded-[0.438rem] bg-black dark:text-black dark:bg-white dark:hover:bg-[#11d43c] leading-3 dark:hover:text-white">
        Generate
      </Button>
    </div>
  );
}

/*
 *The permissions you give on Spotify are only for your account to add and remove playlists and to pull the names
 *of songs you like and are not used anywhere else
 */
