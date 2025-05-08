"use client";
import organizationApi from "@/shared/services/organization";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function OrganizationDetail({ id }: { id: string }) {
  const { data: organization } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => organizationApi.getOrganizationById(id),
  });

  return (
    <div className="mx-6 p-2 border border-zinc-200 rounded-[6px]">
      <div className="px-6 rounded-[6px] border-zinc-200">
        <div className="py-2">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Organisasi
          </span>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Nama</div>
          <div className="text-sm text-zinc-800">{organization?.name}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Deskripsi</div>
          <div className="text-sm text-zinc-800">
            {organization?.description}
          </div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Email</div>
          <div className="text-sm text-zinc-800">{organization?.email}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Telepon</div>
          <div className="text-sm text-zinc-800">
            {organization?.phone_number}
          </div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Website</div>
          <div className="text-sm text-zinc-800">{organization?.website}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Alamat</div>
          <div className="text-sm text-zinc-800">{organization?.address}</div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Status</div>
          <div className="text-sm text-zinc-800">
            {organization?.is_active ? "Aktif" : "Tidak Aktif"}
          </div>
        </div>
        <div className="py-2">
          <div className="text-sm font-medium text-zinc-950">Thumbnail</div>
          {organization?.thumbnail ? (
            <Image
              src={organization.thumbnail}
              alt="Thumbnail Organisasi"
              className="w-32 h-32 object-cover rounded"
              width={32}
              height={32}
            />
          ) : (
            <div className="text-sm text-zinc-800">Tidak ada thumbnail</div>
          )}
        </div>
      </div>
    </div>
  );
}
