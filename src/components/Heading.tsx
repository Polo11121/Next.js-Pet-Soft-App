import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type HeadingProps = {
  className?: string;
} & PropsWithChildren;

export const Heading = ({ children, className }: HeadingProps) => (
  <h1 className={cn("font-medium text-2xl leading-6", className)}>
    {children}
  </h1>
);
