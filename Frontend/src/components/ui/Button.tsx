import React from "react";
import { cn } from "../../utils/cn";

export type ButtonProps = { 
    variant?: 'primary' | 'secondary' | 'tertiary';
    className?: string | string[];
    children: React.ReactNode;
     isLoading?: boolean;
     loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-black font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed",
  tertiary:
    "bg-transparent text-blue-600 hover:text-blue-700 font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed",
};


export function Button({
  variant = "primary",
  className,
  children,
  isLoading,
  disabled,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        "w-full py-3 rounded-lg",
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default Button;