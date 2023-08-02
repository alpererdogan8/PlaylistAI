import Image from "next/image";
import Link from "next/link";
import { NextSVG, SpotifySVG, OpenAISVG, VercelSVG } from "@/assets/images/logos/index";
import { ThemeButton } from "../Theme";

export function Footer() {
  return (
    <footer className="px-5 min-h-[185px]  bg-black w-full lg:h-[225px] mt-auto flex flex-col md:flex-row items-center justify-evenly md:justify-between  ">
      <Link href="https://alpererdogan.dev" className="text-secondary text-lg font-bold  lg:text-base">
        alpererdogan.dev
      </Link>
      <div className="flex justify-center  lg:flex-wrap gap-7 lg:gap-[50px] ">
        <Image className="w-[70px] h-[29px]  lg:w-[95px]  lg:h-[29px]" src={SpotifySVG} alt="Spotify Logo" />
        <Image className="w-[70px] h-[29px] lg:w-[95px]  lg:h-[29px]" src={OpenAISVG} alt="OpenAI Logo " />
        <Image className="w-[70px] h-[29px] lg:w-[95px]  lg:h-[29px]" src={VercelSVG} alt="Vercel Logo" />
        <Image className="w-[70px] h-[29px]  lg:w-[95px]  lg:h-[29px]" src={NextSVG} alt="Next.js Logo" />
      </div>
      <ThemeButton />
    </footer>
  );
}
