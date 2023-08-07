import { Header } from "@/components/layout/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Session } from "@/components/provider/Session";
import { ThemeProvider } from "@/components/ThemeProvider";

const AlbertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist AI",
  description: "Generated Spotfiy Playlist with GPT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${AlbertSans.className} flex flex-col justify-between items-center h-screen selection:bg-primary selection:text-black font-semibold `}>
        <Session>
          <ThemeProvider attribute="class" enableSystem>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
