"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { signOutUser } from "@/actions/users";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const signOutHandler = () => startTransition(async () => await signOutUser());

  return (
    <Button onClick={signOutHandler} disabled={isPending}>
      Sign Out
    </Button>
  );
};
