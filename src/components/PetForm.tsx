"use client";

import { flushSync } from "react-dom";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { usePetsContext } from "@/contexts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { PetFormType, petFormSchema } from "@/schemas/pet";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit?: () => void;
};

export const PetForm = ({ actionType, onFormSubmit }: PetFormProps) => {
  const { selectedPet, addPetHandler, editPetHandler } = usePetsContext();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<PetFormType>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "add"
        ? {}
        : {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          },
  });

  const submitHandler = async () => {
    const result = await trigger();

    if (!result) {
      return;
    }

    flushSync(() => {
      onFormSubmit?.();
    });

    const pet = getValues();
    const formattedPet = {
      ...pet,
      imageUrl: pet.imageUrl || DEFAULT_PET_IMAGE,
      age: Number(pet.age),
    };

    if (actionType === "add") {
      await addPetHandler(formattedPet);
    }

    if (selectedPet?.id && actionType === "edit") {
      await editPetHandler(formattedPet);
    }
  };

  return (
    <form action={submitHandler} className="flex flex-col gap-3">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} id="name" />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input {...register("ownerName")} id="ownerName" />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input {...register("imageUrl")} id="imageUrl" />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input {...register("age")} id="age" />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            {...register("notes")}
            rows={3}
            id="notes"
            className="resize-none"
          />
          {errors.notes && (
            <span className="text-red-500">{errors.notes.message}</span>
          )}
        </div>
      </div>
      <Button>{actionType === "add" ? "Add a new pet" : "Edit pet"}</Button>
    </form>
  );
};
