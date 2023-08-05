"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Label } from "./ui/label";

export function ProfileCard() {
  const [position, setPosition] = useState<{ logout: "logout" | "" }>();
  const { data } = useSession();

  useEffect(() => {
    if (position?.logout === "logout") {
      signOut();
    }
    return () => {
      setPosition({ logout: "" });
    };
  }, [position]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group h-[3.2rem] min-w-[8.72rem] cursor-pointer   gap-1.5 lg:gap-2 lg:min-w-[11.56em] lg:h-[3.5em]  font-semibold border-black 
          hover:border-black border-solid rounded-[5px] border-[3px] text-[1rem] lg:text-[1.125rem] flex justify-center lg:justify-between items-center bg-opposite text-black hover:bg-black hover:text-secondary transition-all ease-in-out -tracking-wider text-secondary"
          variant="outline">
          <Label className="text-md lg:text-xl cursor-pointer   font-semibold">{data?.user.id}</Label>
          <Avatar className=" hidden md:flex lg:w-[55px] w-10 h-10 lg:h-[55px] border-[3px] border-black  rounded-full">
            <AvatarImage src={data?.user.image} />
            <AvatarFallback>PL</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12.72rem] lg:w-[13rem] border-[3px] border-black bg-opposite text-white">
        <DropdownMenuLabel className="mx-2">Profile Settings</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-1 mx-2 mb-2 border-black " />
        <DropdownMenuRadioGroup value={position?.logout} onValueChange={() => setPosition({ logout: "logout" })}>
          <DropdownMenuRadioItem className="cursor-pointer pl-[10px] mx-2" value="logout">
            Logout
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
