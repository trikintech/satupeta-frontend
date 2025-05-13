"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  MapSourceFormValues,
  mapSourceSchema,
} from "@/shared/schemas/map-source";
import credentialApi from "@/shared/services/credential";
import { Credential } from "@/shared/types/credential";
import { MapSource } from "@/shared/types/map-source";

interface MapSourceFormProps {
  defaultValues?: Partial<MapSource>;
  onSubmitAction: (data: MapSourceFormValues) => void;
  isSubmitting?: boolean;
  onCancelAction?: () => void;
}

export function MapSourceForm({
  defaultValues,
  onSubmitAction,
  isSubmitting,
  onCancelAction,
}: MapSourceFormProps) {
  const form = useForm<MapSourceFormValues>({
    resolver: zodResolver(mapSourceSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      credential_id: defaultValues?.credential?.id || "",
      url: defaultValues?.url || "",
      is_active: defaultValues?.is_active ?? true,
    },
  });

  const { data: credentials, isLoading: isCredLoading } = useQuery<
    Credential[]
  >({
    queryKey: ["credentials"],
    queryFn: () =>
      credentialApi.getCredentials().then((response) => response.items),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama" {...field} />
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
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan deskripsi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credential_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credential</FormLabel>
              <Select
                disabled={isCredLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih credential" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {credentials?.map((credential: Credential) => (
                    <SelectItem key={credential.id} value={credential.id}>
                      {credential.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Aktifkan atau nonaktifkan
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

        <div className="flex justify-end space-x-4">
          {onCancelAction && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancelAction}
              disabled={isSubmitting}
            >
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting || isCredLoading}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
