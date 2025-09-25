import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "STUDENT" | "ADMIN";
    } & DefaultSession["user"] 
  }

  interface User extends DefaultUser {
    role?: "STUDENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "STUDENT" | "ADMIN"
  }
}