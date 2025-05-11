"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import userApi from "@/shared/services/user"; // Make sure this path is correct
import DetailItem from "../../_components/detail-item";
import { User } from "@/shared/types/user";
import { getRoleLabelById } from "@/shared/config/role";

export default function UserDetail({ id }: { id: string }) {
  const { data: user } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Pengguna
          </span>
        </div>

        <DetailItem label="Nama" value={user?.name} />
        <DetailItem label="Username" value={user?.username} />
        <DetailItem label="Email" value={user?.email} />
        <DetailItem label="NIP" value={user?.employee_id} />
        <DetailItem label="Jabatan" value={user?.position} />
        <DetailItem
          label="Status"
          value={user?.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Role"
          value={getRoleLabelById(user?.role?.name ?? "") ?? "-"}
        />
        <DetailItem
          label="Organisasi"
          value={user?.organization?.name ?? "-"}
        />
        <DetailItem
          label="Foto Profil"
          value={
            user?.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt="Foto Profil"
                className="w-32 h-32 object-cover rounded"
                width={128}
                height={128}
              />
            ) : (
              "Tidak ada foto"
            )
          }
        />
      </div>
    </div>
  );
}
