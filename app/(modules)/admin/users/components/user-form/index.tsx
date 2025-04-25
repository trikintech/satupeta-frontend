"use client";

import { useState, useEffect } from "react";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ds/button";
import { useDialog } from "@/shared/utils/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import userApi from "@/shared/services/user";
import { UserFormData, useUserForm } from "../../hooks/use-user-form";
import { UserFormFields } from "./user-form-fields";

export const UserForm = ({ userId }: { userId?: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const { success, confirm } = useDialog();
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      userId ? userApi.getUserById(+userId).then((res) => res.data) : null,
    enabled: !!userId,
  });

  const form = useUserForm();

  useEffect(() => {
    setIsMounted(true);
    if (userData) {
      form.reset({ ...userData, password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserFormData) => {
      return userId
        ? userApi.updateUser(+userId, data)
        : userApi.createUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      success({
        title: "Berhasil",
        description: userId
          ? "User berhasil diperbarui"
          : "User berhasil ditambahkan",
        onConfirm: () => router.push("/admin/users"),
      });
    },
    onError: (err) =>
      confirm({
        title: "Gagal",
        description: err.message,
        onConfirm: () => {},
      }),
  });

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (userId && !data.password) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = data;
            mutate(rest as UserFormData);
          } else {
            mutate(data);
          }
        })}
        className="space-y-6"
      >
        <UserFormFields form={form} userId={userId} />
        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.push("/admin/users")}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
};
