import { getSession } from "next-auth/react";

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(session?.accessToken
      ? {
          Authorization: `Bearer ${session.accessToken}`,
        }
      : {}),
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });
};
