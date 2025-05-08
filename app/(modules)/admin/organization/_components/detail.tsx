"use client";
import organizationApi from "@/shared/services/organization";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import DetailItem from "../../_components/detail-item";
import { getFileThumbnailUrl } from "@/shared/utils/file";

export default function OrganizationDetail({ id }: { id: string }) {
  const { data: organization } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => organizationApi.getOrganizationById(id),
  });

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Organisasi
          </span>
        </div>

        <DetailItem label="Nama" value={organization?.name} />
        <DetailItem label="Deskripsi" value={organization?.description} />
        <DetailItem label="Email" value={organization?.email} />
        <DetailItem label="Telepon" value={organization?.phone_number} />
        <DetailItem label="Website" value={organization?.website} />
        <DetailItem label="Alamat" value={organization?.address} />
        <DetailItem
          label="Status"
          value={organization?.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Thumbnail"
          value={
            organization?.thumbnail ? (
              <Image
                src={getFileThumbnailUrl(organization.thumbnail)}
                alt="Thumbnail Organisasi"
                className="w-32 h-32 object-cover rounded"
                width={128}
                height={128}
              />
            ) : (
              "Tidak ada thumbnail"
            )
          }
        />
      </div>
    </div>
  );
}
