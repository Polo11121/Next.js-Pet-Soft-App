"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";
import { PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/Dialog";
import { PetForm } from "@/components/PetForm";

type PetButtonProps = {
  actionType: "add" | "checkout" | "edit";
  onClick?: () => void;
} & PropsWithChildren;
export const PetButton = ({
  actionType,
  children,
  onClick,
}: PetButtonProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} variant="secondary">
        {children}
      </Button>
    );
  }

  const toggleModalVisibilityHandler = () =>
    setIsFormOpen((prevState) => !prevState);

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleModalVisibilityHandler}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button onClick={onClick} size="icon">
            <PlusIcon className="w-6 h-6" />
          </Button>
        ) : (
          <Button onClick={onClick} variant="secondary">
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new Pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmit={toggleModalVisibilityHandler}
        />
      </DialogContent>
    </Dialog>
  );
};
