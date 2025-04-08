export type Topic = {
  id: number;
  name: string;
  slug: string;
  deskripsi: string | null;
  image: string;
  count_dataset_public: number;
  count_dataset_internal: number;
  count_dataset_private: number;
  is_active: boolean;
  is_deleted: boolean;
  cuid: number;
  cdate: string;
  muid: number;
  mdate: string;
};
