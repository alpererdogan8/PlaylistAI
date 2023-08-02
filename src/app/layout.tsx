import { Header } from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Session } from "@/components/provider/Session";

const AlbertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist AI",
  description: "Generated Spotfiy Playlist with GPT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${AlbertSans.className} flex flex-col justify-between items-center h-screen`}>
        <Session>
          <Header />
          {children}
          <Footer />
        </Session>
      </body>
    </html>
  );
}
