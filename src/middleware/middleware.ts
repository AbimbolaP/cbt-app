import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req}) =>{
      const url = req.nextUrl.pathname;

      if(url.startsWith("/admin")) {
        return token?.role === "ADMIN";
      }

      if(url.startsWith("/dashboard")) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path", "/admin/:path"],
};