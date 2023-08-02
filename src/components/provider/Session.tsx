"use client";
import { SessionProvider } from "next-auth/react";

export function Session({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
