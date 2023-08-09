"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function Login({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant={"outline"}
      onClick={() => signIn("spotify", { callbackUrl: "/generate" })}
      className="h-[3rem] w-[9.72rem] p-1 lg:w-[11.56em] lg:h-[3.5em]  font-semibold text-[1rem] lg:text-[1.125rem] flex justify-center items-center transition-all ease-in-out -tracking-wider border-[3px] border-secondary-foreground hover:bg-secondary-foreground hover:text-white hover:dark:text-secondary ">
      {children}
    </Button>
  );
}
