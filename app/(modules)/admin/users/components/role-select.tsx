import React from "react";
import { cn } from "@/shared/utils/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import Role from "@/shared/enums/role";

interface FormRoleSelectProps {
  name: string;
  placeholder?: string;
  defaultValue?: Role;
  className?: string;
  disabled?: boolean;
}

export const FormRoleSelect: React.FC<FormRoleSelectProps> = ({
  name,
  placeholder = "Select a role",
  defaultValue,
  className,
  disabled = false,
}) => {
  const { control } = useFormContext();

  const roleOptions = [
    { value: Role.ADMIN, label: "Administrator" },
    { value: Role.WALIDATA, label: "Wali Data" },
    { value: Role.OPD_PENGELOLA, label: "OPD Pengelola" },
    { value: Role.OPD_VIEW, label: "OPD View" },
  ];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className={cn("w-full", className)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {roleOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </>
      )}
    />
  );
};

export default FormRoleSelect;
