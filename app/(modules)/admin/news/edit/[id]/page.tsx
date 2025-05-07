"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import newsApi from "@/shared/services/news";
import { News } from "@/shared/types/news";
import { initialFormState, newsFormAtom } from "../../../state/news-form";
import { NewsForm } from "../../components/form";
import { useEffect } from "react";
import PageHeader from "../../../components/page-header";

export default function EditNewsPageClient() {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;
  const queryClient = useQueryClient();
  const [formState, setFormState] = useAtom(newsFormAtom);

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => newsApi.getNewsById(newsId),
    enabled: !!newsId,
  });

  const isLoading = isLoadingNews;

  useEffect(() => {
    if (!news) return;
    setFormState({
      name: news.name,
      description: news.description,
      thumbnail: news.thumbnail,
      is_active: news.is_active,
    });
  }, [news, setFormState]);

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

  const updateNewsMutation = useMutation({
    mutationFn: (newsData: News) => {
      return newsApi.updateNews(newsId, newsData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", newsId] });
      toast.success("Berita berhasil diperbarui!");
      router.push("/admin/news");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat memperbarui data");
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

    updateNewsMutation.mutate(payload);
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
    <div className="container space-y-6">
      <PageHeader title="Ubah Berita" description="Ubah berita di sistem." />
      <div className="bg-white rounded-md shadow">
        <NewsForm
          initialData={formState}
          onSubmit={handleSubmitNews}
          isSubmitting={updateNewsMutation.isPending}
          onCancel={resetForm}
        />
      </div>
    </div>
  );
}
