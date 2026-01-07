'use client';

import { Modal, Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSave?: () => void;
  isSaving?: boolean;
}

/**
 * Modal de confirmación para cambios sin guardar
 * Se muestra cuando el usuario intenta salir de una página con cambios pendientes
 */
export default function UnsavedChangesModal({
  isOpen,
  onClose,
  onDiscard,
  onSave,
  isSaving = false,
}: UnsavedChangesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title="Cambios sin guardar">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-700">
              Tienes cambios que no se han guardado. Si sales ahora, perderás los cambios.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ¿Qué deseas hacer?
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <Button 
            variant="ghost" 
            onClick={onDiscard}
            className="flex-1"
          >
            Descartar cambios
          </Button>
          {onSave && (
            <Button 
              variant="primary" 
              onClick={onSave}
              isLoading={isSaving}
              className="flex-1"
            >
              Guardar y salir
            </Button>
          )}
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="flex-1"
          >
            Seguir editando
          </Button>
        </div>
      </div>
    </Modal>
  );
}
