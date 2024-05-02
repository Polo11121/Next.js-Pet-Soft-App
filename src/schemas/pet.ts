import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { z } from "zod";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name is too short" })
      .max(100, { message: "Name is too long" }),
    ownerName: z
      .string()
      .trim()
      .min(3, { message: "Owner name is too short" })
      .max(100, { message: "Owner name is too long" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid image URL" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive({ message: "Age must be a positive number" })
      .max(30, { message: "Age must be less than 30" }),
    notes: z.union([
      z.literal(""),
      z
        .string()
        .trim()
        .min(3, { message: "Notes is too short" })
        .max(300, { message: "Notes is too long" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type PetFormType = z.infer<typeof petFormSchema>;
