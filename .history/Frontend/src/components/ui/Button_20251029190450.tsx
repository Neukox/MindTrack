import React from "react";
import { cn } from "../../utils/cn";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "neutral";
  className?: string | string[];
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium shadow-lg transition disabled:bg-gray-400 dark:disabled:bg-gray-600 cursor-pointer",
  secondary:
    "text-sm font-medium text-white bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 hover:scale-105 active:scale-95 rounded-lg px-5 py-2 shadow-md transition-all duration-200 ease-in-out cursor-pointer",
  tertiary:
    "text-primary dark:text-gray-300 dark:hover:text-white text-shadow-2xs whitespace-nowrap font-medium transition disabled:text-gray-400 disabled:cursor-not-allowed",
  quaternary:
    "text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 transition duration-200 ease-in-out cursor-pointer",
  neutral:
    "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white hover:shadow-md hover:scale-[1.03] active:scale-95 font-medium rounded-lg text-base px-6 py-3 transition-all duration-200 ease-in-out border border-gray-200 dark:border-gray-600 cursor-pointer",
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
      className={cn(" py-3 rounded-lg", variants[variant], className)}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default Button;
