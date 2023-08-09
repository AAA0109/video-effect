import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const pubAPI = process.env.DIRECTUS_PUBLIC_API;

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch(pubAPI + "auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const user = await res.json();

        if (!res.ok) {
          throw new Error("Email ou mot de passe incorrect.");
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          expires: Date.now() + user.data.expires,
          refreshToken: user.data.refresh_token,
          error: user.data.error,
        };
      }

      if (Date.now() < token.expires) {
        return token;
      }

      const refreshed = await refreshAccessToken(token);
      return await refreshed;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expires = token.expires;
      session.user.error = token.error;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  debug: true,
};

async function refreshAccessToken(token) {
  try {
    const response = await fetch(pubAPI + "auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
      credentials: "include",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      signIn();
    }

    if (response.ok && refreshedTokens) {
      return {
        ...token,
        accessToken: refreshedTokens.data.access_token,
        expires: Date.now() + refreshedTokens.data.expires,
        refreshToken: refreshedTokens.data.refresh_token,
      };
    }
  } catch (error) {
    console.log(
      new Date().toUTCString() + " Error in refreshAccessToken:",
      error
    );

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const nextauthfunc = (req, res) => NextAuth(req, res, options);

export default nextauthfunc;
