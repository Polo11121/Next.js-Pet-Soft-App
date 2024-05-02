"use server";

import { petFormSchema, petIdSchema } from "@/schemas/pet";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/serverUtils";
import { PetFormData } from "@/lib/types";
import prisma from "@/lib/db";

export const addPetAction = async (pet: PetFormData) => {
  const session = await checkAuth();

  const { success, data } = petFormSchema.safeParse(pet);

  if (!success) {
    return {
      message: "Invalid pet data.",
    };
  }
  try {
    await prisma.pet.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app/dashboard");
};

export const editPetAction = async (id: string, pet: PetFormData) => {
  const session = await checkAuth();

  const { success: petSuccess, data: validatedPet } =
    petFormSchema.safeParse(pet);

  const { data: validatedId, success: idSuccess } = petIdSchema.safeParse(id);

  if (!petSuccess || !idSuccess) {
    return {
      message: "Invalid pet data.",
    };
  }

  const petToEdit = await prisma.pet.findUnique({
    where: {
      id: validatedId,
    },
    select: {
      userId: true,
    },
  });

  if (!petToEdit) {
    return {
      message: "Pet not found.",
    };
  }

  if (petToEdit?.userId !== session.user.id) {
    return {
      message: "Unauthorized.",
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
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app/dashboard");
};

export const deletePetAction = async (id: string) => {
  const session = await checkAuth();

  const { data, success } = petIdSchema.safeParse(id);

  if (!success) {
    return {
      message: "Invalid pet id.",
    };
  }

  const petToDelete = await prisma.pet.findUnique({
    where: {
      id: data,
    },
    select: {
      userId: true,
    },
  });

  if (!petToDelete) {
    return {
      message: "Pet not found.",
    };
  }

  if (petToDelete?.userId !== session.user.id) {
    return {
      message: "Unauthorized.",
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
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app/dashboard");
};
