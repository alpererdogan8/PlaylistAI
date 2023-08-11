/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>();
  useEffect(() => {
    setCurrentTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-[16em] h-[3rem] md:w-[10.563rem] md:h-[3.563rem] transition-all border-2 font-bold text-md  md:text-lg tracking-[-5.5%] rounded-[5px] bg-black text-primary-foreground">
        {currentTheme?.charAt(0).toUpperCase() + currentTheme?.slice(1)!}
      </Button>
    </>
  );
}
