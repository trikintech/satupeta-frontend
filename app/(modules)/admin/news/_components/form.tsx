"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ImageUpload } from "@/shared/components/image-upload";
import { TiptapEditor } from "@/shared/components/text-editor";
import { NewsFormValues, newsSchema } from "@/shared/schemas/news";

interface NewsFormProps {
  defaultValues?: Partial<NewsFormValues>;
  onSubmitAction: (data: NewsFormValues) => void;
  isPending?: boolean;
  onCancelAction?: () => void;
}

export function NewsForm({
  defaultValues,
  onSubmitAction,
  isPending = false,
  onCancelAction,
}: NewsFormProps) {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      thumbnail: defaultValues?.thumbnail || "",
      is_active: defaultValues?.is_active ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul konten" {...field} />
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
              <FormLabel>Isi Konten</FormLabel>
              <FormControl>
                <TiptapEditor
                  content={field.value ?? ""}
                  onChange={field.onChange}
                  minHeight={200}
                  maxHeight={800}
                  initialHeight={400}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                />
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
                  Aktifkan atau nonaktifkan konten
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
              disabled={isPending}
            >
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
