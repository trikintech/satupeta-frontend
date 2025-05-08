const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getFileUrl = (fileId: string): string => {
  return `${API_URL}/files/${fileId}/download`;
};

export const getFileThumbnailUrl = (fileId: string): string => {
  return getFileUrl(fileId);
};
