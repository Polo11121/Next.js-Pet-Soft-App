"use client";

import { flushSync } from "react-dom";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { usePetsContext } from "@/contexts";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit?: () => void;
};

export const PetForm = ({ actionType, onFormSubmit }: PetFormProps) => {
  const { selectedPet, addPetHandler, editPetHandler } = usePetsContext();

  const submitHandler = async (formData: FormData) => {
    flushSync(() => {
      onFormSubmit?.();
    });

    if (actionType === "add") {
      await addPetHandler(formData);
    }

    if (selectedPet?.id && actionType === "edit") {
      await editPetHandler(formData);
    }
  };

  return (
    <form action={submitHandler} className="flex flex-col gap-3">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            id="name"
            type="text"
            name="name"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            id="ownerName"
            type="text"
            name="ownerName"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
            id="imageUrl"
            type="text"
            name="imageUrl"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
            id="age"
            type="number"
            name="age"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            id="notes"
            rows={3}
            className="resize-none"
            name="notes"
            required
          />
        </div>
      </div>
      <Button>{actionType === "add" ? "Add a new pet" : "Edit pet"}</Button>
    </form>
  );
};
