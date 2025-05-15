"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import newsApi from "@/shared/services/news";
import { NewsForm } from "../../_components/form";
import { useNewsForm } from "../../_hooks/use-form";
import { NewsFormValues } from "@/shared/schemas/news";

export default function NewsEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: news, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsApi.getNewsById(id),
  });

  const { handleSubmitNews, resetForm, isSubmitting } = useNewsForm(news);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="max-w-xl">
        <NewsForm
          defaultValues={news as Partial<NewsFormValues>}
          onSubmitAction={handleSubmitNews}
          isPending={isSubmitting}
          onCancelAction={resetForm}
        />
      </div>
    </div>
  );
}
