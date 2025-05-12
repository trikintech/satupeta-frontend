// components/mapset-metadata-form.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

const metadataSchema = z.object({
  source_id: z.string().min(1, "MapServer harus dipilih"),
  layer_url: z.string().min(1, "Link MapServer harus diisi"),
});

type MetadataFormValues = z.infer<typeof metadataSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetMetadataFormProps {
  initialData: Partial<MetadataFormValues>;
  mapSources: SelectOption[];
  onSubmit: (data: MetadataFormValues) => void;
  onPrevious: () => void;
}

export function MapsetMetadataForm({
  initialData,
  mapSources,
  onSubmit,
  onPrevious,
}: MapsetMetadataFormProps) {
  const form = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      source_id: initialData.source_id || "",
      layer_url: initialData.layer_url || "",
    },
  });

  useEffect(() => {
    form.reset({
      source_id: initialData.source_id || "",
      layer_url: initialData.layer_url || "",
    });
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Pilih MapServer */}
        <FormField
          control={form.control}
          name="source_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih MapServer<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih server untuk menyimpan data" />
                  </SelectTrigger>
                  <SelectContent>
                    {mapSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Pilih server tempat data mapset disimpan. Pilih
                &quot;Lainnya&quot; jika tidak tersedia dalam daftar.
              </p>
            </FormItem>
          )}
        />

        {/* Masukan Link */}
        <FormField
          control={form.control}
          name="layer_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Masukan Link<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan URL atau link ke server"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Masukan link MapServer yang akan Anda tampilkan.
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
