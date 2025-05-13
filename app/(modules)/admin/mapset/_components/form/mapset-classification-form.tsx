// components/mapset-classification-form.tsx
"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { coverageOptions } from "@/shared/config/coverage";

const classificationSchema = z.object({
  coverage_level: z.string().optional(),
  coverage_area: z.string().optional(),
});

type ClassificationFormValues = z.infer<typeof classificationSchema>;

interface MapsetClassificationFormProps {
  initialData: Partial<ClassificationFormValues>;
  onSubmit: (data: ClassificationFormValues) => void;
  onPrevious: () => void;
}

export function MapsetClassificationForm({
  initialData,
  onSubmit,
  onPrevious,
}: MapsetClassificationFormProps) {
  const form = useForm<ClassificationFormValues>({
    resolver: zodResolver(classificationSchema),
    defaultValues: {
      coverage_level: initialData?.coverage_level || "",
      coverage_area: initialData?.coverage_area || "",
    },
  });

  useEffect(() => {
    form.reset({
      coverage_level: initialData?.coverage_level || "",
      coverage_area: initialData?.coverage_area || "",
    });
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <FormField
          control={form.control}
          name="coverage_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tingkat Penyajian Wilayah</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tingkat wilayah" />
                  </SelectTrigger>
                  <SelectContent>
                    {coverageOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Pilih tingkat detail penyajian data wilayah.
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverage_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cakupan Wilayah</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih cakupan wilayah" />
                  </SelectTrigger>
                  <SelectContent>
                    {coverageOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Pilih cakupan wilayah data secara administratif.
              </p>
            </FormItem>
          )}
        />

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            className="bg-zinc-200 text-zinc-950"
            onClick={onPrevious}
          >
            Kembali
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Menyimpan..." : "Lanjutkan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
