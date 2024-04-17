import { PropsWithChildren } from "react";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { PetsContextProvider } from "@/contexts/PetsContextProvider";
import { SearchContextProvider } from "@/contexts/SearchContextProvider";
import { Pet } from "@/lib/types";

const AppLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }

  const data: Pet[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetsContextProvider data={data}>{children}</PetsContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default AppLayout;
