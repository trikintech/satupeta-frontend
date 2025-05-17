export type Organization = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  address: string;
  phone_number: string;
  email: string;
  website: string;
  count_mapset?: number;
  is_active?: boolean;
  created_at?: string;
  modified_at?: string;
};
