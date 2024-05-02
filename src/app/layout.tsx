import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/Sonner";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import type { Metadata } from "next";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft.",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <html lang="en">
    <body className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC]`}>
      <NextAuthProvider>
        <Toaster position="top-right" />
        {children}
      </NextAuthProvider>
    </body>
  </html>
);

export default RootLayout;
