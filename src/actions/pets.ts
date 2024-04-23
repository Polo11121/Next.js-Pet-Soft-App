"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const addPetAction = async (formData: FormData) => {
  try {
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    await prisma.pet.create({ data: pet });
  } catch (error) {
    return {
      message: "Could not add pet",
    };
  }

  revalidatePath("/app/dashboard");
};

export const editPetAction = async (id: string, formData: FormData) => {
  try {
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

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
