// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      access_token?: string | null;
      email?: string | null;
    };
  }
}
