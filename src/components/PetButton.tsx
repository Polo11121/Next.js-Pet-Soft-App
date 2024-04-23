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
  DialogFooter,
} from "@/components/ui/Dialog";
import { PetForm } from "@/components/PetForm";

type PetButtonProps = {
  actionType: "add" | "checkout" | "edit";
  onClick?: () => void;
  isPending?: boolean;
} & PropsWithChildren;

export const PetButton = ({
  actionType,
  isPending,
  children,
  onClick,
}: PetButtonProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleModalVisibilityHandler = () =>
    setIsFormOpen((prevState) => !prevState);

  if (actionType === "checkout") {
    return (
      <Dialog open={isFormOpen} onOpenChange={toggleModalVisibilityHandler}>
        <DialogTrigger asChild>
          <Button variant="secondary">{children}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout Pet</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to checkout this pet?</p>
          <DialogFooter>
            <Button
              disabled={isPending}
              onClick={toggleModalVisibilityHandler}
              variant={"secondary"}
            >
              No
            </Button>
            <Button
              disabled={isPending}
              onClick={onClick}
              variant={"destructive"}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleModalVisibilityHandler}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button onClick={onClick} size="icon">
            <PlusIcon className="w-6 h-6" />
          </Button>
        ) : (
          <Button variant="secondary" disabled={isPending}>
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
