import Image from "next/image";
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";

export function MusicItem() {
  return (
    <div className="p-3 w-[24.88rem] md-10 md:m-0  max-w-[27rem] h-auto gap-3 drop-shadow-md dark:drop-shadow-2xl min-h-[7.75rem] bg-gradient-to-b from-slate-700 to-slate-900 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900   text-white rounded-[0.50rem] flex items-center">
      <div className="group w-auto h-auto shrink-0 flex justify-center items-center p-0 hover:flex">
        <Button className="hidden group-hover:flex cursor-pointer absolute w-[6.5rem] h-[6.5rem]  rounded-[0.50rem] justify-center items-center hover:bg-slate-900/30 bg-slate-900/30 ">
          <PlayIcon width={"48px"} height={"48px"} radius={"10px"} />
        </Button>
        <Image className="self-start bg-red-500 w-[6.5rem] h-[6.5rem] shrink-0 rounded-[0.50rem]" src={""} alt={"s"} />
      </div>
      <div className="w-full flex flex-col justify-stretch items-start">
        <header className="font-semibold text-[1.60rem] -tracking-wider">Smells Like Teen Spirit</header>
        <section className="font-medium text-lg -tracking-wider">Saint Mesa</section>
        <footer className="self-end ">
          <Button className="bg-[#f53f3f] hover:bg-[#9e1818] w-[6.38rem] h-[2.13rem] rounded-[0.50rem] ">Remove</Button>
        </footer>
      </div>
    </div>
  );
}
