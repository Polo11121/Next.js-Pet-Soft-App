"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useOptimistic,
  useState,
} from "react";
import { Pet } from "@prisma/client";
import { addPetAction, deletePetAction, editPetAction } from "@/actions/pets";
import { toast } from "sonner";

type PetFormData = Omit<Pet, "createdAt" | "updatedAt" | "id">;

type PetsContextValue = {
  pets: Pet[];
  selectedPetId: string | null;
  setSelectedPetId: Dispatch<SetStateAction<string | null>>;
  selectedPet: Pet | undefined;
  editPetHandler: (pet: PetFormData) => Promise<void>;
  addPetHandler: (pet: PetFormData) => Promise<void>;
  deletePetHandler: () => Promise<void>;
  numberOfPets: number;
};

type PetsContextProviderProps = { data: Pet[] } & PropsWithChildren;

export const PetsContext = createContext<null | PetsContextValue>(null);

type State = (Pet & { selected?: boolean })[];

type Action = {
  action: "edit" | "add" | "delete";
  payload: PetFormData;
};

export const PetsContextProvider = ({
  children,
  data,
}: PetsContextProviderProps) => {
  const [selectedPetId, setSelectedPetId] = useState<null | string>(null);
  const [pets, setPets] = useOptimistic<State, Action>(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [
            ...state,
            {
              ...payload,
              id: Date.now().toString(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
        case "edit":
          return state.map((statePet) =>
            statePet.id === selectedPetId
              ? {
                  ...payload,
                  id: Date.now().toString(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  selected: true,
                }
              : statePet
          );
        case "delete":
          return state.filter((statePet) => statePet.id !== selectedPetId);
        default:
          return state;
      }
    }
  );

  const selectedPet = pets.find(
    (pet) => selectedPetId === pet.id || pet.selected
  );
  const numberOfPets = pets.length;

  const addPetHandler = async (pet: PetFormData) => {
    setPets({
      action: "add",
      payload: pet,
    });

    const error = await addPetAction(pet);

    if (error) {
      toast.error(error.message);
    }

    toast("Pet added successfully!");
  };

  const editPetHandler = async (pet: PetFormData) => {
    setPets({
      action: "edit",
      payload: pet,
    });

    const error = await editPetAction(selectedPet?.id as string, pet);

    if (error) {
      toast.error(error.message);
    }

    toast("Pet edited successfully!");
  };

  const deletePetHandler = async () => {
    if (selectedPetId) {
      const error = await deletePetAction(selectedPetId);

      if (error) {
        toast.warning(error.message);
      }

      toast("Checkout pet successfully!");
    }
  };

  const value = {
    pets,
    selectedPetId,
    setSelectedPetId,
    selectedPet,
    numberOfPets,
    editPetHandler,
    addPetHandler,
    deletePetHandler,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};
