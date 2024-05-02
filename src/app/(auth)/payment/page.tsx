"use client";

import { useTransition } from "react";
import { createCheckoutSession, giveAccess } from "@/actions/users";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type PaymentPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const PaymentPage = ({
  searchParams: { success, canceled },
}: PaymentPageProps) => {
  const { update, status } = useSession();
  const [isPending, startTransition] = useTransition();

  const payHandler = () =>
    startTransition(async () => {
      const response = await createCheckoutSession();

      if (response?.message) {
        toast.error(response.message);
        redirect("/payment?success=true");
      }
    });

  const giveAccessHandler = () =>
    startTransition(async () => {
      const response = await giveAccess();
      await update(true);

      if (response?.message) {
        toast.error(response.message);
        redirect("/payment?canceled=true");
      } else {
        redirect("/app/dashboard");
      }
    });

  return (
    <main className="flex flex-col items-center gap-y-10">
      <Heading>PetSoft access requires payment</Heading>
      {canceled && (
        <p className="text-sm text-red-700">
          Payment canceled. You can try again if you like.
        </p>
      )}
      {success ? (
        <>
          <p className="text-sm text-green-700">
            Payment successful! You now have lifetime access to PetSoft.
          </p>
          <Button
            disabled={isPending || status === "loading"}
            onClick={giveAccessHandler}
          >
            Access PetSoft
          </Button>
        </>
      ) : (
        <Button onClick={payHandler} disabled={isPending}>
          Buy lifetime access for $299
        </Button>
      )}
    </main>
  );
};

export default PaymentPage;
