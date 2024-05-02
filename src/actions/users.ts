"use server";

import { signIn, signOut } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const signInUser = async (_prevState: unknown, formData: FormData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Wrong email or password.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in user.",
          };
        }
      }
    }

    throw error;
  }
};

export const signOutUser = async () =>
  await signOut({
    redirectTo: "/",
  });

export const signUpUser = async (_prevState: unknown, formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  try {
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "User already exists.",
        };
      }
    }
    return {
      message: "Could not sign up user.",
    };
  }

  await signIn("credentials", formData);
};
