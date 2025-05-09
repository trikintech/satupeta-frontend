import { apiHelpers } from "./api";

export interface FileUploadResponse {
  id: string;
  object_name: string;
  uploaded_by: {
    id: string;
    name: string;
    email: string;
    profile_picture: string;
    username: string;
    position: string;
    role: {
      id: string;
      name: string;
      description: string;
      is_active: boolean;
    };
    employee_id: string;
    organization: {
      id: string;
      name: string;
      description: string;
      thumbnail: string;
      address: string;
      phone_number: string;
      email: string;
      website: string;
    };
    is_active: boolean;
  };
  created_at: string;
  modified_at: string;
}

export const fileApi = {
  uploadFile: async (
    file: File,
    description?: string
  ): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    if (description) {
      formData.append("description", description);
    }

    return apiHelpers.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default fileApi;
