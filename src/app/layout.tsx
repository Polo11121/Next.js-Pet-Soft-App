import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/Sonner";
import { Inter } from "next/font/google";
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
      <Toaster position="top-right" />
      {children}
    </body>
  </html>
);

export default RootLayout;
