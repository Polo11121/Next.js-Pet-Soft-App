"use client";

import { Logo } from "@/components/Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ROUTES = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export const AppHeader = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-x-2 text-xs">
          {ROUTES.map(({ label, path }) => {
            const isActive = path === pathname;
            return (
              <li key={path}>
                <Link
                  className={cn(
                    "text-white/70 rounded-md px-2 py-1 hover:text-white focus:text-white transition",
                    isActive && "bg-black/10 text-white"
                  )}
                  href={path}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
