"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Label } from "./ui/label";

export function ProfileCard() {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="outline-none  dark:bg-[#11d43c] hover:dark:bg-green-500 group h-[3.2rem] min-w-[8.72rem] cursor-pointer md:min-w-[10rem] lg:min-w-[13rem] lg:h-[4rem]  font-semibold  text-[1rem] lg:text-[1.125rem] items-center transition-all ease-in-out -tracking-wider text-white flex justify-center"
          variant="default">
          <Label className="text-md lg:text-xl cursor-pointer font-semibold">{data?.user.id}</Label>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" border-red-500 hover:border-red-500 p-0 min-w-[8.72rem] h-[3.2rem] lg:h-auto md:w-[9.74rem] lg:w-[13rem] border-[3px]  bg-opposite">
        <DropdownMenuRadioGroup className="h-[3.2rem]">
          <DropdownMenuRadioItem
            className=" focus:bg-destructive bg-destructive/80   p-1 w-full h-[100%] pb-2 lg:pb-0.5 text-base md:text-xl   cursor-pointer flex justify-center items-center text-primary-foreground focus:text-white  "
            value="logout"
            onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
