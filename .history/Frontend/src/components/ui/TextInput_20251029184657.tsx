import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues = FieldValues> {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
}

export default function TextInput<T extends FieldValues = FieldValues>({
  label,
  type = "text",
  placeholder,
  className = "",
  register,
  name,
  error,
  disabled = false,
  required = false,
}: TextInputProps<T>) {
  const inputProps = register && name ? register(name, { required }) : {};

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...inputProps}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-colors ${
          disabled ? "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" : ""
        } ${className}`}
      />

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message || "Campo inválido"}
        </p>
      )}
    </div>
  );
}
