export type UserRole = "administrator" | "opd" | "walidata";

export type AuthUser = {
  id: number;
  name: string;
  jabatan: string;
  email: string;
  username: string;
  nip: string;
  image: string;
  organisasi_id: number;
  organisasi_name: string;
  organisasi_slug: string;
  organisasi_deskripsi: string;
  organisasi_notelp: string;
  organisasi_alamat: string;
  organisasi_website: string;
  organisasi_email: string;
  wilayah_id: number;
  nama_wilayah: string;
  kode_wilayah: string;
  wilayah_notes: string;
  wilayah_image: string;
  role: string;
  jwt: string;
};

export type AuthResponse = {
  code: number;
  message: string;
  data: AuthUser;
  error: Record<string, unknown>;
};
