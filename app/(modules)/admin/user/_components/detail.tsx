"use client";
import userApi from "@/shared/services/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import DetailItem from "../../_components/detail-item";
import { getFileThumbnailUrl } from "@/shared/utils/file";

export default function UserDetail({ id }: { id: string }) {
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi User
          </span>
        </div>

        <DetailItem label="Nama" value={user?.name} />
        <DetailItem label="Email" value={user?.email} />
        <DetailItem label="Username" value={user?.username} />
        <DetailItem label="Posisi" value={user?.position} />
        <DetailItem label="Role" value={user?.role?.name} />
        <DetailItem label="NIP" value={user?.employee_id} />
        <DetailItem label="Organisasi" value={user?.organization?.name} />
        <DetailItem
          label="Status"
          value={user?.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Foto Profil"
          value={
            user?.profile_picture ? (
              <Image
                src={getFileThumbnailUrl(user.profile_picture)}
                alt="Foto Profil"
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
            ) : (
              "Tidak ada foto profil"
            )
          }
        />
      </div>
    </div>
  );
}
