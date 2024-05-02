import { PropsWithChildren } from "react";
import { Logo } from "@/components/Logo";

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
    <Logo />
    {children}
  </div>
);

export default AuthLayout;
