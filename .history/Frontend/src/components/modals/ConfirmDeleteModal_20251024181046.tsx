import { useState } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const requiredText = "EXCLUIR";

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmText === requiredText) {
      onConfirm();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Excluir Registro
              </h3>
              <p className="text-sm text-slate-500">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
          >
            <FaTimes className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="mb-4">
            <p className="text-slate-700 mb-2">
              Você está prestes a excluir permanentemente o registro:
            </p>
            <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-red-500">
              <p className="font-medium text-slate-800 truncate">"{title}"</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-3">
              Para confirmar, digite{" "}
              <span className="font-semibold text-red-600">EXCLUIR</span> no
              campo abaixo:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="Digite EXCLUIR para confirmar"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={confirmText !== requiredText || isLoading}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Excluindo..." : "Excluir Registro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
