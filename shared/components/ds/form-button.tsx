"use client";

import { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  variant?: "primary" | "secondary";
  loadingText?: string;
}

export function FormButton({
  children,
  isSubmitting = false,
  variant = "primary",
  loadingText = "Menyimpan...",
  className = "",
  ...props
}: Readonly<FormButtonProps>) {
  const baseStyle = "px-4 py-2 rounded-md disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      disabled={isSubmitting || props.disabled}
      {...props}
    >
      {isSubmitting ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2 align-[-0.125em]"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
