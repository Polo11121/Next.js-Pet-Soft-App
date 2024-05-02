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
      const isLoggedOut = Boolean(auth?.user);
      const isTryingToAccessProtectedPage =
        request.nextUrl.pathname.includes("/app");

      if (!isLoggedOut && isTryingToAccessProtectedPage) {
        return false;
      }
      if (isLoggedOut && isTryingToAccessProtectedPage) {
        return true;
      }
      if (isLoggedOut && !isTryingToAccessProtectedPage) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLoggedOut && !isTryingToAccessProtectedPage) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
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
