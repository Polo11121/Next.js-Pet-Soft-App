"use client";

import { FormEvent } from "react";
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
  const { setPets, selectedPet } = usePetsContext();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl: formData.get("imageUrl") as string,
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
      id: Date.now().toString(),
    };

    if (actionType === "add") {
      setPets((prevState) => [...prevState, pet]);
    } else {
      setPets((prevState) =>
        prevState.map((prevPet) =>
          prevPet.id === selectedPet?.id ? pet : prevPet
        )
      );
    }

    onFormSubmit?.();
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-3">
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
