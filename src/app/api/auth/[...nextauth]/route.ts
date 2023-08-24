import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const authHeader = process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET;
    const based = Buffer.from(authHeader).toString("base64");
    const body = "grant_type=refresh_token&refresh_token=" + token.refresh_token;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + based,
      },
      body: body,
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: {
        params: {
          scope: process.env.SPOTIFY_SCOPES,
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId;
        token.expires_at = account.expires_at;
        token.access_token = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_at!;

        token.refresh_token = account.refresh_token;
      }

      if (Date.now() < token.accessTokenExpires!) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.id = token.id!;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.expires = token.accessTokenExpires!;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
