"use client";

import { PetListItem } from "@/components/PetListItem";
import { usePetsContext, useSearchContext } from "@/contexts";

export const PetsList = () => {
  const { searchTerm } = useSearchContext();
  const { pets, setSelectedPetId, selectedPetId } = usePetsContext();

  const filteredPets = pets.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => {
        const selectPetHandler = () => setSelectedPetId(pet.id);
        const isSelected = pet.id === selectedPetId;

        return (
          <PetListItem
            key={pet.id}
            pet={pet}
            onSelectPet={selectPetHandler}
            isSelected={isSelected}
          />
        );
      })}
    </ul>
  );
};
