"use server";

import { revalidatePath } from "next/cache";
import { Pet } from "@prisma/client";
import prisma from "@/lib/db";

export const addPetAction = async (
  pet: Omit<Pet, "id" | "updatedAt" | "createdAt">
) => {
  try {
    await prisma.pet.create({ data: pet });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};

export const editPetAction = async (
  id: string,
  pet: Omit<Pet, "id" | "updatedAt" | "createdAt">
) => {
  try {
    await prisma.pet.update({
      where: {
        id,
      },
      data: pet,
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};

export const deletePetAction = async (id: string) => {
  try {
    await prisma.pet.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};
