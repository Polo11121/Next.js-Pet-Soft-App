import { PropsWithChildren } from "react";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { PetsContextProvider } from "@/contexts/PetsContextProvider";
import { SearchContextProvider } from "@/contexts/SearchContextProvider";
import { checkAuth } from "@/lib/serverUtils";
import { SessionProvider } from "next-auth/react";
import prisma from "@/lib/db";

const AppLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const session = await checkAuth();

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SessionProvider>
          <SearchContextProvider>
            <PetsContextProvider data={pets}>{children}</PetsContextProvider>
          </SearchContextProvider>
        </SessionProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default AppLayout;
