import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "@/schemas/uset";
import prisma from "@/lib/db";

const config: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { data, success } = authFormSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          data.password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessProtectedPage =
        request.nextUrl.pathname.includes("/app");
      const isTryingToAccessPaymentPage =
        request.nextUrl.pathname.includes("/payment");

      if (isLoggedIn) {
        if (!auth?.user.hasAccess && !isTryingToAccessPaymentPage) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        if (!auth?.user.hasAccess && isTryingToAccessPaymentPage) {
          return true;
        }

        if (auth?.user.hasAccess && isTryingToAccessProtectedPage) {
          return true;
        }

        if (
          auth?.user.hasAccess &&
          (!isTryingToAccessProtectedPage || isTryingToAccessPaymentPage)
        ) {
          return Response.redirect(new URL("/app/dashboard", request.nextUrl));
        }
      }

      if (!isLoggedIn) {
        if (isTryingToAccessProtectedPage || isTryingToAccessPaymentPage) {
          return Response.redirect(new URL("/sign-in", request.nextUrl));
        }

        if (!isTryingToAccessProtectedPage) {
          return true;
        }
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user?.id) {
        token.id = user.id;
        token.hasPaid = user.hasPaid;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        const updatedUser = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
        });

        if (updatedUser) {
          token.hasPaid = updatedUser.hasPaid;
          token.hasAccess = updatedUser.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.hasPaid = token.hasPaid;
        session.user.hasAccess = token.hasAccess;
      }

      return session;
    },
  },
  pages: {
    signIn: "sign-in",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
