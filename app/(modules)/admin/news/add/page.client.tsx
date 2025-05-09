"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import newsApi from "@/shared/services/news";
import { News } from "@/shared/types/news";
import { initialFormState, newsFormAtom } from "../state";
import { NewsForm } from "../_components/form";

export default function AddNewsPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useAtom(newsFormAtom);

  const isLoading = false;

  const updateFormData = (updatedData: Partial<News>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    router.push("/admin/news");
  };

  const submitNewsMutation = useMutation({
    mutationFn: (newsData: Omit<News, "id">) => {
      return newsApi.createNews(newsData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setFormState(initialFormState);
      toast.success("Konten berhasil disimpan!");
      router.push("/admin/news");
    },
    onError: (error: Error) => {
      console.error("Error creating news:", error);
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const handleSubmitNews = (data: News) => {
    updateFormData(data);

    const payload: News = {
      name: data.name,
      description: data.description,
      thumbnail: data.thumbnail,
      is_active: data.is_active,
    };

    submitNewsMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="bg-white rounded-md shadow">
        <NewsForm
          initialData={formState}
          onSubmit={handleSubmitNews}
          isSubmitting={submitNewsMutation.isPending}
          onCancel={resetForm}
        />
      </div>
    </div>
  );
}
