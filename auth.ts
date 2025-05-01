import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const data = await response.json();

          if (
            !response.ok ||
            (data.error && Object.keys(data.error).length > 0)
          ) {
            throw new Error(data.message || "Authentication failed");
          }

          return {
            id: data.data.id.toString(),
            name: data.data.name,
            email: data.data.email,
            username: data.data.username,
            nip: data.data.nip,
            role: data.data.role,
            jabatan: data.data.jabatan,
            image: data.data.image,
            jwt: data.data.jwt,
            organisasi_slug: data.data.organisasi_slug,
            organisasi_name: data.data.organisasi_name,
            nama_wilayah: data.data.nama_wilayah,
            kode_wilayah: data.data.kode_wilayah,
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
        token.id = user.id;
        token.jwt = user.jwt;
        token.role = user.role;
        token.organisasi_name = user.organisasi_name;
        token.organisasi_slug = user.organisasi_slug;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, token }: any) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.jwt = token.jwt as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login/error",
  },
});
