import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://fullstack.exercise.applifting.cz/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "X-API-KEY": process.env.API_KEY || "",
              "Content-Type": "application/json",
            },
          },
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
