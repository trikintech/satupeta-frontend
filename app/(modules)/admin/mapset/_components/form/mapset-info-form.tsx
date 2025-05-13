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
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { Switch } from "@/shared/components/ui/switch";

// Validation schema
const mapsetInfoSchema = z.object({
  name: z.string().min(3, "Judul mapset minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi terlalu pendek"),
  is_popular: z.boolean(),
  scale: z.string().min(1, "Skala harus diisi"),
  projection_system_id: z.string().min(1, "Sistem proyeksi harus dipilih"),
  category_id: z.string().min(1, "Kategori harus dipilih"),
  classification_id: z.string().min(1, "Klasifikasi harus dipilih"),
  organization_id: z.string().min(1, "Organisasi harus dipilih"),
  data_status: z.enum(["sementara", "tetap"], {
    required_error: "Status data harus dipilih",
  }),
});

type MapsetInfoFormValues = z.infer<typeof mapsetInfoSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetInfoFormProps {
  initialData: Partial<MapsetInfoFormValues>;
  projectionSystems: SelectOption[];
  categories: SelectOption[];
  classifications: SelectOption[];
  organizations: SelectOption[];
  onSubmit: (data: MapsetInfoFormValues) => void;
}

export function MapsetInfoForm({
  initialData,
  projectionSystems,
  categories,
  classifications,
  organizations,
  onSubmit,
}: MapsetInfoFormProps) {
  const form = useForm<MapsetInfoFormValues>({
    resolver: zodResolver(mapsetInfoSchema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      is_popular: initialData.is_popular || false,
      scale: initialData.scale || "",
      projection_system_id: initialData.projection_system_id || "",
      category_id: initialData.category_id || "",
      classification_id: initialData.classification_id || "",
      organization_id: initialData.organization_id || "",
      data_status: initialData.data_status || "sementara",
    },
  });

  useEffect(() => {
    form.reset({
      name: initialData.name || "",
      description: initialData.description || "",
      is_popular: initialData.is_popular || false,
      scale: initialData.scale || "",
      projection_system_id: initialData.projection_system_id || "",
      category_id: initialData.category_id || "",
      classification_id: initialData.classification_id || "",
      organization_id: initialData.organization_id || "",
      data_status: initialData.data_status || "sementara",
    });
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Mapset <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul mapset" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deskripsi<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tuliskan penjelasan lengkap mengenai isi dan tujuan mapset."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Skala<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Contoh: 1:25.000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sistem Proyeksi */}
        <FormField
          control={form.control}
          name="projection_system_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sistem Proyeksi<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih sistem proyeksi" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectionSystems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Kategori */}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kategori<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Klasifikasi */}
        <FormField
          control={form.control}
          name="classification_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Klasifikasi<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih klasifikasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {classifications.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Organisasi */}
        <FormField
          control={form.control}
          name="organization_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisasi</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih organisasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status Data */}
        <FormField
          control={form.control}
          name="data_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Data</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sementara" />
                    </FormControl>
                    <FormLabel className="font-normal">Sementara</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="tetap" />
                    </FormControl>
                    <FormLabel className="font-normal">Tetap</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_popular"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Mapset Populer</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Aktifkan untuk menandai mapset ini sebagai populer.
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex">
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
