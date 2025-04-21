import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import { useFormContext, Controller } from "react-hook-form";

interface FormTopicSelectProps {
  name: string;
  placeholder?: string;
  defaultValue?: number;
  className?: string;
  disabled?: boolean;
}

export const FormTopicSelect: React.FC<FormTopicSelectProps> = ({
  name,
  placeholder = "Select a organization",
  defaultValue,
  className,
  disabled = false,
}) => {
  const { control } = useFormContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationApi.getOrganizations,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  if (error) {
    return (
      <div className="py-2 text-sm text-red-500">
        Failed to load organizations. Please try again.
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || undefined}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            value={
              field.value !== undefined && field.value !== null
                ? field.value.toString()
                : undefined
            }
            onValueChange={(value) => {
              field.onChange(Number(value));
            }}
            disabled={disabled || isLoading}
          >
            <SelectTrigger className={cn("w-full", className)}>
              <SelectValue
                placeholder={
                  isLoading ? "Loading organizations..." : placeholder
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Topics</SelectLabel>
                {data?.map((organization) => (
                  <SelectItem
                    key={organization.id}
                    value={organization.id.toString()}
                  >
                    {organization.name}
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

export default FormTopicSelect;
