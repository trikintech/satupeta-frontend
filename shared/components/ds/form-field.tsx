"use client";

import { ReactNode } from "react";
import {
  FieldPath,
  FieldValues,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

interface FormFieldProps<TFormValues extends FieldValues> {
  id: FieldPath<TFormValues>;
  label: string;
  registerAction: UseFormRegister<TFormValues>;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "password" | "select" | "checkbox" | "number";
  options?: { id: string; name: string }[];
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function FormField<TFormValues extends FieldValues>({
  id,
  label,
  registerAction,
  error,
  required = false,
  placeholder = "",
  type = "text",
  options = [],
  className = "",
  disabled = false,
  children,
}: Readonly<FormFieldProps<TFormValues>>) {
  const inputClassName = "w-full p-2 border rounded-md";

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {(() => {
        if (type === "select") {
          return (
            <select
              id={id}
              {...registerAction(id)}
              className={`${inputClassName} ${className}`}
              disabled={disabled}
            >
              <option value="">{placeholder || `Pilih ${label}`}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          );
        }

        if (type === "checkbox") {
          return (
            <div className="flex items-center">
              <input
                id={id}
                type="checkbox"
                {...registerAction(id)}
                disabled={disabled}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {children}
            </div>
          );
        }

        return (
          <input
            id={id}
            type={type}
            {...registerAction(id)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputClassName} ${className}`}
          />
        );
      })()}

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
