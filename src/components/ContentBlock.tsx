import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ContentBlockProps = {
  className?: string;
} & PropsWithChildren;
export const ContentBlock = ({ children, className }: ContentBlockProps) => (
  <div
    className={cn(
      "shadow-md rounded-md bg-[#F7F8FA] overflow-hidden h-full w-full",
      className
    )}
  >
    {children}
  </div>
);
