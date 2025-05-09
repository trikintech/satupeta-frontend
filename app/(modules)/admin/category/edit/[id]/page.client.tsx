"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import categoryApi from "@/shared/services/category";
import { CategoryForm } from "../../_components/form";
import { useCategoryForm } from "../../_hooks/use-category-form";
import { CategoryFormValues } from "@/shared/schemas/category";

export default function CategoryEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getCategoryById(id),
  });

  const { handleSubmitCategory, resetForm, isSubmitting } =
    useCategoryForm(category);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <CategoryForm
        defaultValues={category as Partial<CategoryFormValues>}
        onSubmitAction={handleSubmitCategory}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
