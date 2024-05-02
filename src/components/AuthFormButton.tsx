"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";

export const AuthFormButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{children}</Button>;
};
