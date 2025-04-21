"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form-input";
import { Button } from "@/shared/components/ds/button";
import { User } from "@/shared/types/user";
import userApi from "@/shared/services/user";
import FormOrganizationSelect from "@/shared/components/form-organization-select";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username minimal 3 karakter",
  }),
  name: z.string().min(3, {
    message: "Nama minimal 3 karakter",
  }),
  jabatan: z.string().optional(),
  email: z.string().email({
    message: "Email tidak valid",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password minimal 8 karakter",
    })
    .regex(/[A-Z]/, {
      message: "Password harus mengandung minimal 1 huruf kapital",
    })
    .regex(/\d/, {
      message: "Password harus mengandung minimal 1 angka",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password harus mengandung minimal 1 karakter spesial",
    }),
  nip: z.string().optional(),
  image: z.string().optional(),
  wilayah_id: z.number({ required_error: "Wilayah tidak boleh kosong" }),
  organisasi_id: z.number({ required_error: "Organisasi tidak boleh kosong" }),
  role: z.string().optional(),
  is_active: z.boolean().optional(),
});

type UserFormData = z.infer<typeof formSchema>;

export const UserForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      jabatan: "",
      email: "",
      password: "",
      nip: "",
      image: "",
      wilayah_id: 1,
      organisasi_id: undefined,
      role: "administrator",
      is_active: true,
    },
  });

  const { mutate, isPending } = useMutation<User, Error, UserFormData>({
    mutationFn: async (formData) => {
      const response = await userApi.createUser(formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      form.reset();
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  const handleSubmit = (data: UserFormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormInput
              name="username"
              label="Username"
              placeholder="alberteinstein"
              field={field}
              error={form.formState.errors.username}
            />
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              field={field}
              error={form.formState.errors.password}
            />
          )}
        />

        <FormField
          name="nip"
          control={form.control}
          render={({ field }) => (
            <FormInput
              name="nip"
              label="NIP"
              placeholder="13233XXXX"
              field={field}
              error={form.formState.errors.nip}
            />
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormInput
              name="name"
              label="Nama"
              placeholder="Albert Einstein"
              field={field}
              error={form.formState.errors.name}
            />
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="alberteinstein@gmail.com"
              field={field}
              error={form.formState.errors.email}
            />
          )}
        />

        <FormItem>
          <FormLabel>Organisasi</FormLabel>
          <FormOrganizationSelect
            name="organisasi_id"
            placeholder="Pilih Organisasi"
          />
        </FormItem>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
