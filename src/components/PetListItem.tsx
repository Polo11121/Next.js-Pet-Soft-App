import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Pet } from "@prisma/client";
import Image from "next/image";

type PetListItemProps = {
  pet: Pet;
  onSelectPet: () => void;
  isSelected: boolean;
};

export const PetListItem = ({
  pet,
  isSelected,
  onSelectPet,
}: PetListItemProps) => (
  <li key={pet.id}>
    <button
      onClick={onSelectPet}
      className={cn(
        "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
        isSelected && "bg-[#EFF1F2]"
      )}
    >
      <Image
        src={pet.imageUrl || DEFAULT_PET_IMAGE}
        alt="pet image"
        height={45}
        width={45}
        className="w-[45px] h-[45px] rounded-full object-cover"
      />
      <p className="font-semibold">{pet.name}</p>
    </button>
  </li>
);
