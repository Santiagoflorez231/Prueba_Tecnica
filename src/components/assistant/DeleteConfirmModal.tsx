'use client';

import { Modal, Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';
import { Assistant } from '@/types/assistant';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assistant: Assistant | null;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  assistant,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!assistant) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Eliminar asistente
        </h3>

        <p className="text-gray-500 mb-6">
          ¿Estás seguro de que deseas eliminar a{' '}
          <span className="font-medium text-gray-700">{assistant.name}</span>?
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
