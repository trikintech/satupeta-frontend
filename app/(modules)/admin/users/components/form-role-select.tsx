"use client";

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
import { ControllerRenderProps, FieldError } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import Role from "@/shared/enums/role";

interface FormRoleSelectProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  className?: string;
}

export const FormRoleSelect = ({
  label,
  placeholder = "Pilih Role",
  disabled = false,
  field,
  error,
  className,
}: FormRoleSelectProps) => {
  const roleOptions = [
    { value: Role.ADMIN, label: "Administrator" },
    { value: Role.WALIDATA, label: "Wali Data" },
    { value: Role.OPD_PENGELOLA, label: "OPD Pengelola" },
    { value: Role.OPD_VIEW, label: "OPD View" },
  ];

  return (
    <FormItem>
      <FormLabel>
        {label} {field.value}
      </FormLabel>
      <FormControl>
        <Select
          value={field.value?.toString()}
          onValueChange={(value) => {
            if (value) field.onChange(value);
          }}
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
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
};
