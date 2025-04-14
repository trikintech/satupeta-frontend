// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-geist whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-slate-50 hover:bg-primary-hover",
        secondary: "bg-secondary text-gray-900 hover:bg-secondary-hover",
        tertiary: "bg-tertiary text-white hover:bg-tertiary-hover",
        success: "bg-success text-white hover:bg-success/90",
        destructive: "bg-error text-white hover:bg-error/90",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
