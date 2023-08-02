import { GenerateListSVG, MusicListSVG, PromptSVG } from "@/assets/images/content";
import { Card } from "@/components/landing/Card";

export default function Home() {
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
        <section className="w-auto">
          <iframe
            className="w-full h-[600px] my-20"
            src="https://www.youtube.com/embed/pg6UhJbFl0A?controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </section>
      </main>
    </>
  );
}
