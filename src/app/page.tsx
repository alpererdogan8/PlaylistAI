import { GenerateListSVG, MusicListSVG, PromptSVG } from "@/assets/images/content";
import { Card } from "@/components/landing/Card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Video from "@/components/landing/Video";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/generate");
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <header className="font-extrabold leading-8 -tracking-[0.05em] my-6 lg:mb-12 text-center  text-[2.5rem]  lg:text-[3.813rem]">
          Automate playlist create
        </header>
        <article className="font-medium lg:text-xl lg:w-6/12 text-center">
          Create unique playlists based on the songs you like on Spotify with the command you enter.{" "}
        </article>
      </section>
      <main className=" w-11/12">
        <section className="w-full flex flex-col lg:flex-row justify-between gap-10 my-20">
          <Card
            imgWidth={325}
            imgHeight={434}
            header="Like your favorite music to spotify"
            image={MusicListSVG}
            alt="image"
          />
          <Card
            imgWidth={325}
            imgHeight={434}
            header="Enter prompt to edit the playlist"
            image={PromptSVG}
            alt="image"
          />
          <Card imgWidth={325} imgHeight={434} header="Your new playlist" image={GenerateListSVG} alt="image" />
        </section>
        <section className="flex justify-center items-center">
          <Video />
        </section>
      </main>
    </>
  );
}
