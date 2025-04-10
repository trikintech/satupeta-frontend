import { AuthResponse } from "@/shared/types/auth-user";

export function transformAuthResponse(response: AuthResponse) {
  return {
    id: response.data.id.toString(),
    name: response.data.name,
    jabatan: response.data.jabatan,
    email: response.data.email,
    username: response.data.username,
    nip: response.data.nip,
    image: response.data.image,
    role: response.data.role,
    jwt: response.data.jwt,
    organisasi_id: response.data.organisasi_id,
    organisasi_name: response.data.organisasi_name,
    organisasi_slug: response.data.organisasi_slug,
    organisasi_deskripsi: response.data.organisasi_deskripsi,
    organisasi_notelp: response.data.organisasi_notelp,
    organisasi_alamat: response.data.organisasi_alamat,
    organisasi_website: response.data.organisasi_website,
    organisasi_email: response.data.organisasi_email,
    wilayah_id: response.data.wilayah_id,
    wilayah_name: response.data.nama_wilayah,
    wilayah_kode: response.data.kode_wilayah,
    wilayah_notes: response.data.wilayah_notes,
    wilayah_image: response.data.wilayah_image,
  };
}
