import { useState } from "react";
import type {
  UseFormRegister,
  Path,
  FieldValues,
  FieldError,
} from "react-hook-form";
import { TogglePasswordButton } from "./TogglePasswordButton";

interface PasswordInputProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  name?: Path<T>;
  placeholder?: string;
  className?: string;
  showPassword?: boolean;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
}

export default function PasswordInput<T extends FieldValues>({
  register,
  name,
  placeholder = "********",
  className = "",
  showPassword,
  error,
  disabled = false,
  required = false,
}: PasswordInputProps<T>) {
  const isControlled = typeof showPassword === "boolean";
  const [internalVisible, setInternalVisible] = useState(false);
  const visible = isControlled ? (showPassword as boolean) : internalVisible;

  const inputProps =
    register && name
      ? register(name, {
          required: required ? "Este campo é obrigatório" : false,
          minLength: {
            value: 8,
            message: "Senha deve ter no mínimo 8 caracteres",
          },
        })
      : {};

  return (
    <div className="relative w-full mb-4">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
        className={`w-full pr-10 px-4 py-2 border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-colors ${
          disabled ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed" : ""
        } ${className}`}
      />
      {!disabled && !isControlled && (
        <TogglePasswordButton
          showPassword={visible}
          onToggle={() => setInternalVisible((v) => !v)}
        />
      )}
      {/* If parent controls visibility, it should render its own TogglePasswordButton and pass onToggle to control that state. */}
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message || "Campo inválido"}
        </p>
      )}
    </div>
  );
}
