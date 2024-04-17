import { PropsWithChildren } from "react";

export const Heading = ({ children }: PropsWithChildren) => (
  <h1 className="font-medium text-2xl leading-6">{children}</h1>
);
