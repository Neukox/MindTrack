import React, { useState } from "react";
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
  showPassword?: boolean; // inicial, opcional
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
}

export default function PasswordInput<T extends FieldValues>({
  register,
  name,
  placeholder = "********",
  className = "",
  showPassword = false,
  error,
  disabled = false,
  required = false,
}: PasswordInputProps<T>) {
  const [visible, setVisible] = useState(showPassword);

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
        className={`w-full pr-10 px-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${className}`}
      />
      {!disabled && (
        <TogglePasswordButton
          showPassword={visible}
          onToggle={() => setVisible((v) => !v)}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message || "Campo inválido"}
        </p>
      )}
    </div>
  );
}
