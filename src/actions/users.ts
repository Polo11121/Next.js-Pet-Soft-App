"use server";

import { signIn, signOut } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/serverUtils";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

export const createCheckoutSession = async () => {
  const session = await checkAuth();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user?.hasPaid) {
    return {
      message: "User has already paid.",
    };
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRODUCT_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment?canceled=true`,
  });

  redirect(checkoutSession.url);
};

export const giveAccess = async () => {
  const session = await checkAuth();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user?.hasPaid) {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { hasAccess: true },
      });
    } else {
      return {
        message: "User has not paid.",
      };
    }
  } catch (error) {
    return {
      message: "Could not give access.",
    };
  }

  redirect("/app/dashboard");
};
