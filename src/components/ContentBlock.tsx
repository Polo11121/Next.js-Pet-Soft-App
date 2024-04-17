import { PropsWithChildren } from "react";

export const ContentBlock = ({ children }: PropsWithChildren) => (
  <div className=" shadow-md rounded-md bg-[#F7F8FA] overflow-hidden h-full w-full">
    {children}
  </div>
);
