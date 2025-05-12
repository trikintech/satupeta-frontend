// components/mapset-version-form.tsx
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
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

const versionSchema = z.object({
  data_update_period: z.string().min(1, "Periode update data harus diisi"),
  data_version: z.string().min(1, "Edisi/Versi data harus diisi"),
});

type VersionFormValues = z.infer<typeof versionSchema>;

interface MapsetVersionFormProps {
  initialData: Partial<VersionFormValues>;
  onSubmit: (data: VersionFormValues) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export function MapsetVersionForm({
  initialData,
  onSubmit,
  onPrevious,
  isSubmitting,
}: MapsetVersionFormProps) {
  const form = useForm<VersionFormValues>({
    resolver: zodResolver(versionSchema),
    defaultValues: {
      data_update_period: initialData.data_update_period || "",
      data_version: initialData.data_version || "",
    },
  });

  useEffect(() => {
    form.reset({
      data_update_period: initialData.data_update_period || "",
      data_version: initialData.data_version || "",
    });
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Periode Update Data */}
        <FormField
          control={form.control}
          name="data_update_period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Periode Update Data<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Triwulanan, Tahunan, atau periode tertentu lainnya"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Contoh: Triwulanan, Tahunan, atau periode tertentu lainnya.
              </p>
            </FormItem>
          )}
        />

        {/* Edisi/Versi Data */}
        <FormField
          control={form.control}
          name="data_version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Edisi/Versi Data<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Tuliskan versi atau edisi data"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Tuliskan versi atau edisi data.
              </p>
            </FormItem>
          )}
        />

        {/* Navigation Buttons */}
        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            className="bg-zinc-200 text-zinc-950"
            onClick={onPrevious}
          >
            Kembali
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
