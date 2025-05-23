import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  error?: Record<string, unknown>;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: token.refresh_token,
        }),
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${refreshedTokens.access_token}`,
      },
    });

    const userData = await userResponse.json();

    return {
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      accessTokenExpires: refreshedTokens.expires_at * 1000,
      user: {
        id: String(userData.id),
        name: userData.name,
        email: userData.email,
        image: userData.image,
        username: userData.username,
        role: userData.role,
        organizationId: userData.organization?.id || null, // Only store organization ID
      },
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  basePath: "/auth",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const formData = new FormData();
          formData.append("username", credentials?.username as string);
          formData.append("password", credentials?.password as string);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = (await response.json()) as LoginResponse;

          if (!response.ok || data.error) {
            throw new Error(data.message || "Authentication failed");
          }

          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/me`,
            {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            }
          );

          const userData = await userResponse.json();

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          return {
            id: String(userData.id),
            name: userData.name,
            email: userData.email,
            image: userData.profile_picture,
            username: userData.username,
            role: userData.role,
            organizationId: userData.organization?.id || null, // Only store organization ID
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            accessTokenExpires: data.expires_at * 1000,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          accessTokenExpires: user.accessTokenExpires,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username,
            role: user.role,
            organizationId: user.organizationId, // Only ID
          },
        };
      }

      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      session.error = token.error as string;

      session.user = token.user as AdapterUser & {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        username: string;
        role: string;
        organizationId?: string | null;
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "admin/login",
    error: "admin/login/error",
  },
});
