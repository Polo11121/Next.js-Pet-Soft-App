import { PropsWithChildren } from "react";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { PetsContextProvider } from "@/contexts/PetsContextProvider";
import { SearchContextProvider } from "@/contexts/SearchContextProvider";
import prisma from "@/lib/db";

const AppLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const pets = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetsContextProvider data={pets}>{children}</PetsContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default AppLayout;
