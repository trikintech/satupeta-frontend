"use client";

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
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CredentialFormValues,
  credentialSchema,
} from "../../../../../shared/schemas/credential";
import { Credential } from "@/shared/types/credential";
import { PlusCircle, X } from "lucide-react";

interface CredentialFormProps {
  defaultValues?: Partial<Credential>;
  onSubmitAction: (data: CredentialFormValues) => void;
  isSubmitting?: boolean;
  onCancelAction?: () => void;
}

export function CredentialForm({
  defaultValues,
  onSubmitAction,
  isSubmitting,
  onCancelAction,
}: CredentialFormProps) {
  const form = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      id: defaultValues?.id || "",
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      credential_type: defaultValues?.credential_type || "",
      credential_metadata: defaultValues?.credential_metadata || {
        environment: "",
        version: "",
      },
      is_default: defaultValues?.is_default ?? false,
      is_active: defaultValues?.is_active ?? true,
      created_by: defaultValues?.created_by || "",
      updated_by: defaultValues?.updated_by || "",
      created_at: defaultValues?.created_at || "",
      updated_at: defaultValues?.updated_at || "",
      last_used_at: defaultValues?.last_used_at || "",
      last_used_by: defaultValues?.last_used_by || "",
      sensitive_data: defaultValues?.decrypted_data || {}, // 🆕 This line
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
              <FormLabel>Nama Kredensial</FormLabel>
              <FormControl>
                <Input placeholder="Nama credential" {...field} />
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
                <Textarea placeholder="Deskripsi credential" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credential_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Kredensial</FormLabel>
              <FormControl>
                <Input placeholder="Jenis credential" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Credential Metadata Fields */}
        <FormField
          control={form.control}
          name="credential_metadata.environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <FormControl>
                <Input placeholder="Environment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credential_metadata.version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Versi</FormLabel>
              <FormControl>
                <Input placeholder="Versi Credential" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Switches */}
        <FormField
          control={form.control}
          name="is_default"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between border p-4 rounded-lg">
              <div>
                <FormLabel>Default</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Jadikan credential ini default
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
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between border p-4 rounded-lg">
              <div>
                <FormLabel>Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Aktifkan atau nonaktifkan credential
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
        <FormLabel className="text-base">Data Sensitif</FormLabel>
        <div className="space-y-4 border p-4 rounded-lg">
          {(
            Object.entries(form.watch("sensitive_data") || {}) as [
              string,
              string
            ][]
          ).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
            >
              <Input
                placeholder="Key"
                defaultValue={key}
                onBlur={(e) => {
                  const newKey = e.target.value;
                  const data = { ...form.getValues("sensitive_data") };

                  if (newKey && newKey !== key) {
                    data[newKey] = data[key];
                    delete data[key];
                    form.setValue("sensitive_data", data);
                  }
                }}
              />
              <Input
                placeholder="Value"
                value={value}
                onChange={(e) => {
                  const data = { ...form.getValues("sensitive_data") };
                  data[key] = e.target.value;
                  form.setValue("sensitive_data", data);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const data = { ...form.getValues("sensitive_data") };
                  delete data[key];
                  form.setValue("sensitive_data", data);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const current = form.getValues("sensitive_data") || {};
              const newKey = "key";
              let counter = 1;

              while (current.hasOwnProperty(`${newKey}_${counter}`)) {
                counter++;
              }

              form.setValue("sensitive_data", {
                ...current,
                [`${newKey}_${counter}`]: "",
              });
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Field
          </Button>
        </div>

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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
