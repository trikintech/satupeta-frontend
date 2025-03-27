import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "@/shared/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/utils";
import React from "react";

const buttonVariantConfig = {
  variants: {
    variant: {
      primary: "bg-brand-primary text-white hover:bg-brand-primary/90",
      secondary:
        "bg-brand-secondary text-foreground hover:bg-brand-secondary/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2 text-base",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  buttonVariantConfig
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type CustomButtonProps = Omit<ShadcnButtonProps, "variant" | "size"> &
  ButtonVariantProps & {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ShadcnButton
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin">🌀</span>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
