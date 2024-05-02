"use client";

import { signInUser, signUpUser } from "@/actions/users";
import { Heading } from "@/components//Heading";
import { AuthFormButton } from "@/components/AuthFormButton";
import { Input } from "@/components//ui/Input";
import { Label } from "@/components/ui/Label";
import { useFormState } from "react-dom";
import Link from "next/link";

type AuthFormProps = {
  action: "sign-in" | "sign-up";
};

export const AuthForm = ({ action }: AuthFormProps) => {
  const isSignIn = action === "sign-in";
  const actionText = isSignIn ? "Sign In" : "Sign Up";
  const [state, authAction] = useFormState(isSignIn ? signInUser : signUpUser, {
    message: "",
  });

  return (
    <>
      <Heading className="text-center">{actionText}</Heading>
      <form className="space-y-3" action={authAction}>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            maxLength={100}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            maxLength={100}
          />
        </div>
        <AuthFormButton>{actionText}</AuthFormButton>
        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}
      </form>
      <p>
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={isSignIn ? "sign-up" : "sign-in"}
          className="mt-6 text-sm font-medium text-zinc-500 underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </>
  );
};
