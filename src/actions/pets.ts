"use server";

import { revalidatePath } from "next/cache";
import { Pet } from "@prisma/client";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/schemas/pet";

export const addPetAction = async (
  pet: Omit<Pet, "id" | "updatedAt" | "createdAt">
) => {
  const { success, data } = petFormSchema.safeParse(pet);

  if (!success) {
    return {
      message: "Invalid pet data",
    };
  }
  try {
    await prisma.pet.create({ data });
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
  const { success: petSuccess, data: validatedPet } =
    petFormSchema.safeParse(pet);
  const { data: validatedId, success: idSuccess } = petIdSchema.safeParse(id);

  if (!petSuccess || !idSuccess) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedId,
      },
      data: validatedPet,
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};

export const deletePetAction = async (id: string) => {
  const { data, success } = petIdSchema.safeParse(id);

  if (!success) {
    return {
      message: "Invalid pet id",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: data,
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};
