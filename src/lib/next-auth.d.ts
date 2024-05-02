import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    hasPaid: boolean;
    hasAccess: boolean;
  }
  interface Session {
    user: User & {
      id: string;
      email: string;
      hasPaid: boolean;
      hasAccess: boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    hasPaid: boolean;
    hasAccess: boolean;
  }
}
