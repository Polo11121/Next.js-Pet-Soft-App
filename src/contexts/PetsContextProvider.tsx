"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Pet } from "@prisma/client";

type PetsContextValue = {
  pets: Pet[];
  selectedPetId: string | null;
  setSelectedPetId: Dispatch<SetStateAction<string | null>>;
  selectedPet: Pet | undefined;
  numberOfPets: number;
};

type PetsContextProviderProps = { pets: Pet[] } & PropsWithChildren;

export const PetsContext = createContext<null | PetsContextValue>(null);

export const PetsContextProvider = ({
  children,
  pets,
}: PetsContextProviderProps) => {
  const [selectedPetId, setSelectedPetId] = useState<null | string>(null);

  const selectedPet = pets.find((pet) => selectedPetId === pet.id);
  const numberOfPets = pets.length;

  const value = {
    pets,
    selectedPetId,
    setSelectedPetId,
    selectedPet,
    numberOfPets,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};
