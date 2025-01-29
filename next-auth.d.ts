import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";
import { Role } from "./types";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role?: "moderator" | "admin" | "doctor" | "patient";
  }
}
