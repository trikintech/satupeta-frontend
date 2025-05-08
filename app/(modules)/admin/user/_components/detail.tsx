"use client";
import userApi from "@/shared/services/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function UserDetail({ id }: { id: string }) {
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });

  return (
    <div>
      <div className="p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi User
          </span>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Nama</div>
          <div className="text-sm text-zinc-800">{user?.name}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Email</div>
          <div className="text-sm text-zinc-800">{user?.email}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Username</div>
          <div className="text-sm text-zinc-800">{user?.username}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Posisi</div>
          <div className="text-sm text-zinc-800">{user?.position}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Role</div>
          <div className="text-sm text-zinc-800">{user?.role?.name}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">NIP</div>
          <div className="text-sm text-zinc-800">{user?.employee_id}</div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Organisasi</div>
          <div className="text-sm text-zinc-800">
            {user?.organization?.name}
          </div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Status</div>
          <div className="text-sm text-zinc-800">
            {user?.is_active ? "Aktif" : "Tidak Aktif"}
          </div>
        </div>
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950">Foto Profil</div>
          {user?.profile_picture ? (
            <Image
              src={user.profile_picture}
              alt="Foto Profil"
              className="w-16 h-16 rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <div className="text-sm text-zinc-800">Tidak ada foto profil</div>
          )}
        </div>
      </div>
    </div>
  );
}
