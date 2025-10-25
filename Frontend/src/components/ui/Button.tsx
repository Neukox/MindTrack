import React from "react";
import { cn } from "../../utils/cn";

export type ButtonProps = { 
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'neutral';
    className?: string | string[];
    children: React.ReactNode;
     isLoading?: boolean;
     loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition disabled:bg-gray-400 cursor-pointer",
  secondary:
    "text-sm font-medium text-white bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 rounded-lg px-5 py-2 shadow-md transition-all duration-200 ease-in-out cursor-pointer",
  tertiary:
    "text-primary text-shadow-2xs whitespace-nowrap font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed",
    quaternary:
    "text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2 transition duration-200 ease-in-out cursor-pointer",
    neutral:
    "text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-[1.03] active:scale-95 font-medium rounded-lg text-base px-6 py-3 transition-all duration-200 ease-in-out border border-gray-200 cursor-pointer",
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
        " py-3 rounded-lg",
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