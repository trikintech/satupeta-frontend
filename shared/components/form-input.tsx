/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ControllerRenderProps, FieldError } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "date"
  | "url";

interface FormInputProps {
  name: string;
  label: string;
  type?: InputType;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  description,
  placeholder = "",
  disabled = false,
  field,
  error,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
};
