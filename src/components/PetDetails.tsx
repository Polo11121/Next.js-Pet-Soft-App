"use client";

import { useTransition } from "react";
import { usePetsContext } from "@/contexts";
import { EmptyView } from "@/components/EmptyView";
import { PetButton } from "@/components/PetButton";
import { deletePetAction } from "@/actions/pets";
import { toast } from "sonner";
import Image from "next/image";

export const PetDetails = () => {
  const { selectedPet } = usePetsContext();
  const [isPending, startTransition] = useTransition();

  if (!selectedPet) {
    return <EmptyView text="No pet selected." />;
  }

  const deletePetHandler = () =>
    startTransition(async () => {
      if (selectedPet?.id) {
        const error = await deletePetAction(selectedPet.id);

        if (error) {
          toast.warning(error.message);
        }

        toast("Checkout pet successfully!");
      }
    });

  return (
    <section className="flex flex-col w-full h-full">
      <div className="flex items-center bg-white px-8 py-5 border-b border-light">
        <Image
          src={selectedPet?.imageUrl}
          alt="Selected pet image"
          height={75}
          width={75}
          className="h-[75px] w-[75px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold leading-7 ml-5">
          {selectedPet?.name}
        </h2>
        <div className="ml-auto space-x-2">
          <PetButton actionType="edit" isPending={isPending}>
            Edit
          </PetButton>
          <PetButton
            actionType="checkout"
            onClick={deletePetHandler}
            isPending={isPending}
          >
            Checkout
          </PetButton>
        </div>
      </div>
      <div className="flex justify-around py-10 px-5 text-center">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
        </div>
      </div>
      <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
        {selectedPet?.notes}
      </section>
    </section>
  );
};
