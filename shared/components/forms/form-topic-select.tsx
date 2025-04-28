import React from "react";
import { useQuery } from "@tanstack/react-query";
import topicApi from "@/shared/services/topic";
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
  placeholder = "Select a topic",
  className,
  disabled = false,
}) => {
  const { control } = useFormContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["topics"],
    queryFn: topicApi.getTopics,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  if (error) {
    return (
      <div className="py-2 text-sm text-red-500">
        Failed to load topics. Please try again.
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            value={field.value?.toString()}
            disabled={disabled || isLoading}
          >
            <SelectTrigger className={cn("w-full", className)}>
              <SelectValue
                placeholder={isLoading ? "Loading topics..." : placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Topics</SelectLabel>
                {data?.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id.toString()}>
                    {topic.name}
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
