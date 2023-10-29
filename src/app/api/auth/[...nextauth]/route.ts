import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        const loginUrl = `${process.env.BASE_API_URL}/login`;
        const res = await axios({
          method: "POST",
          url: loginUrl,
          data: credentials,
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
            "Content-Type": "application/json",
          },
        });
        const user = await res.data;

        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
