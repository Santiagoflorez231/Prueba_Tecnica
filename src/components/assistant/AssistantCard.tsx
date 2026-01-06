'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Pencil, Trash2, GraduationCap, Volume2 } from 'lucide-react';
import { Assistant } from '@/types/assistant';
import { Card, Badge } from '@/components/ui';

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onDelete: (assistant: Assistant) => void;
}

export default function AssistantCard({ assistant, onEdit, onDelete }: AssistantCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleTrain = () => {
    router.push(`/${assistant.id}`);
  };

  const toneColors: Record<string, 'default' | 'primary' | 'success' | 'warning'> = {
    Formal: 'default',
    Casual: 'primary',
    Profesional: 'success',
    Amigable: 'warning',
  };

  return (
    <Card variant="hover" className="relative group">
      {/* Menú de acciones */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  onEdit(assistant);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => {
                  handleTrain();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Entrenar
              </button>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={() => {
                  onDelete(assistant);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="pr-10">
        {/* Nombre */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {assistant.name}
        </h3>

        {/* Idioma y Tono */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="primary">{assistant.language}</Badge>
          <Badge variant={toneColors[assistant.tone] || 'default'}>
            {assistant.tone}
          </Badge>
        </div>

        {/* Longitud de respuestas */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1.5">Longitud de respuestas</p>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
            <div
              className="bg-green-400 transition-all"
              style={{ width: `${assistant.responseLength.short}%` }}
              title={`Cortas: ${assistant.responseLength.short}%`}
            />
            <div
              className="bg-yellow-400 transition-all"
              style={{ width: `${assistant.responseLength.medium}%` }}
              title={`Medianas: ${assistant.responseLength.medium}%`}
            />
            <div
              className="bg-orange-400 transition-all"
              style={{ width: `${assistant.responseLength.long}%` }}
              title={`Largas: ${assistant.responseLength.long}%`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Cortas: {assistant.responseLength.short}%</span>
            <span>Medianas: {assistant.responseLength.medium}%</span>
            <span>Largas: {assistant.responseLength.long}%</span>
          </div>
        </div>

        {/* Audio habilitado */}
        {assistant.audioEnabled && (
          <div className="flex items-center gap-1.5 text-sm text-violet-600">
            <Volume2 className="w-4 h-4" />
            <span>Audio habilitado</span>
          </div>
        )}
      </div>
    </Card>
  );
}
