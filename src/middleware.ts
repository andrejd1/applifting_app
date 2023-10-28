export { default, withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/"],
  pages: {
    signIn: "/login",
  },
};
