"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function Login({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant={"outline"}
      onClick={() => signIn("spotify", { callbackUrl: "/playlist" })}
      className="h-[3rem] w-[14.72rem] p-1 lg:w-[11.56em] lg:h-[3.5em]  font-semibold border-black border-solid rounded-[5px] border-2 text-[1rem] lg:text-[1.125rem] flex justify-center items-center hover:bg-black hover:text-secondary transition-all ease-in-out -tracking-wider">
      {children}
    </Button>
  );
}
