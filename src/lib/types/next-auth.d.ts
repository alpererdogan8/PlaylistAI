import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string | undefined;
    refresh_token?: string | undefined;
    expires_date?: string | undefined;
    expires: number;
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
    };
    error: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access_token?: string | undefined;
    refresh_token?: string | undefined;
    id?: string | null | undefined;
    accessTokenExpires?: number;
  }
}
