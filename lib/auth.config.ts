import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import { type NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const getCredentials = loginSchema.safeParse(credentials);

        if (!getCredentials.success) {
          return null;
        }
        const res = await fetch(process.env.BASE_URL + "/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        console.log({ res });
        if (res.status === 200) {
          return await res.json();
        }

        return null;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
