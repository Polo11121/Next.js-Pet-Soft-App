"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Pet } from "@/lib/types";

type PetsContextValue = {
  pets: Pet[];
  selectedPetId: string | null;
  setSelectedPetId: Dispatch<SetStateAction<string | null>>;
  setPets: Dispatch<SetStateAction<Pet[]>>;
  selectedPet: Pet | undefined;
  numberOfPets: number;
};

type PetsContextProviderProps = { data: Pet[] } & PropsWithChildren;

export const PetsContext = createContext<null | PetsContextValue>(null);

export const PetsContextProvider = ({
  children,
  data,
}: PetsContextProviderProps) => {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<null | string>(null);

  const selectedPet = pets.find((pet) => selectedPetId === pet.id);
  const numberOfPets = pets.length;

  const value = {
    pets,
    selectedPetId,
    setSelectedPetId,
    setPets,
    selectedPet,
    numberOfPets,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};
