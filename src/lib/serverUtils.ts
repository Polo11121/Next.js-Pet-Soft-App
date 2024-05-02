import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const checkAuth = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session;
};
