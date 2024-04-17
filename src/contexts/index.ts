import { useContext } from "react";
import { PetsContext } from "@/contexts/PetsContextProvider";
import { SearchContext } from "./SearchContextProvider";

export const usePetsContext = () => {
  const context = useContext(PetsContext);

  if (!context) {
    throw new Error("usePetsContext must be used within a PetContextProvider");
  }

  return context;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("usePetsContext must be used within a PetContextProvider");
  }

  return context;
};
