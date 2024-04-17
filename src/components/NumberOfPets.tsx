"use client";

import { usePetsContext } from "@/contexts";

export const NumberOfPets = () => {
  const { numberOfPets } = usePetsContext();

  return (
    <section className="flex flex-col items-center">
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
};
