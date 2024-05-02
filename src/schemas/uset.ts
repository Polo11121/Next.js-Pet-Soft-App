import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(100),
});

export type AuthFormType = z.infer<typeof authFormSchema>;
