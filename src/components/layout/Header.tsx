import Link from "next/link";
import { Login } from "../LoginBtn";
import { ProfileCard } from "../ProfileCard";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full">
      <nav className="w-full flex justify-between items-center px-[8px] md:px-[3rem] py-[2.75rem] text-black">
        <Link
          href="/"
          className=" text-2xl font-extrabold text-[2.3rem] -tracking-[0.055em]  lg:text-[2.813rem] w-full  padding lg:font-bold ">
          PLAYLIST AI
        </Link>
        {session === null ? <Login>Sign in with Spotify</Login> : <ProfileCard />}
      </nav>
    </header>
  );
}
