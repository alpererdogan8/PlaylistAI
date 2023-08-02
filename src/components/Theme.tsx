"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function ThemeButton() {
  const [theme, setTheme] = useState("Dark Theme");

  return (
    <>
      <Button
        variant={"outline"}
        className="w-[16em] h-[3rem] md:w-[10.563rem] md:h-[3.563rem] transition-all border-2 font-bold text-md  md:text-lg tracking-[-5.5%] rounded-[5px] bg-opposite text-white border-opposite hover:text-opposite">
        {theme}
      </Button>
    </>
  );
}
