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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
