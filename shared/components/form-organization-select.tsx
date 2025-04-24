"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import organizationApi from "@/shared/services/organization";
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

interface FormOrganizationSelectProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const FormOrganizationSelect = <T extends FieldValues>({
  field,
  placeholder = "Pilih Organisasi",
  className,
  disabled = false,
}: FormOrganizationSelectProps<T>) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationApi.getOrganizations,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  if (error) {
    return (
      <div className="py-2 text-sm text-red-500">
        Gagal memuat organisasi. Silakan coba lagi.
      </div>
    );
  }

  return (
    <Select
      value={field.value?.toString()}
      onValueChange={(value) => {
        if (value) field.onChange(value);
      }}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue
          placeholder={isLoading ? "Memuat organisasi..." : placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organisasi</SelectLabel>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Memuat...
            </SelectItem>
          ) : (
            data?.map((organization) => (
              <SelectItem
                key={organization.id}
                value={organization.id.toString()}
              >
                {organization.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FormOrganizationSelect;
