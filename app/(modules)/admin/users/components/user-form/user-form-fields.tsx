import { FormField, FormItem, FormLabel } from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/forms/form-input";
import FormOrganizationSelect from "@/shared/components/forms/form-organization-select";
import { UseFormReturn } from "react-hook-form";
import { FormRoleSelect } from "../form-role-select";
import { UserFormData } from "../../hooks/use-user-form";

interface UserFormFieldsProps {
  form: UseFormReturn<UserFormData>;
  userId?: string;
}

export const UserFormFields = ({ form, userId }: UserFormFieldsProps) => {
  return (
    <>
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
            disabled={!!userId}
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
            placeholder={
              userId ? "Kosongkan jika tidak ingin mengubah" : "Password"
            }
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

      <FormField
        name="jabatan"
        control={form.control}
        render={({ field }) => (
          <FormInput
            name="jabatan"
            label="Jabatan"
            placeholder="Jabatan"
            field={field}
            error={form.formState.errors.jabatan}
          />
        )}
      />

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormRoleSelect
            label="Role"
            placeholder="Pilih Role"
            field={field}
            error={form.formState.errors.role}
          />
        )}
      />

      <FormField
        name="organisasi_id"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organisasi</FormLabel>
            <FormOrganizationSelect
              field={field}
              placeholder="Pilih Organisasi"
            />
            {form.formState.errors.organisasi_id && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.organisasi_id.message}
              </p>
            )}
          </FormItem>
        )}
      />
    </>
  );
};
