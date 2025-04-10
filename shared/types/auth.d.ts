import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    jabatan: string;
    email: string;
    username: string;
    nip: string;
    image: string;
    organisasi_name: string;
    organisasi_slug: string;
    nama_wilayah: string;
    kode_wilayah: string;
    role: string;
    jwt: string;
  }

  interface Session {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    accessToken: string;
  }
}
