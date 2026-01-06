'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2, GraduationCap, Volume2, VolumeX } from 'lucide-react';
import { Assistant } from '@/types/assistant';
import { Button, Badge } from '@/components/ui';

interface AssistantListProps {
  assistants: Assistant[];
  onEdit: (assistant: Assistant) => void;
  onDelete: (assistant: Assistant) => void;
}

export default function AssistantList({ assistants, onEdit, onDelete }: AssistantListProps) {
  const router = useRouter();

  const handleTrain = (assistant: Assistant) => {
    router.push(`/${assistant.id}`);
  };

  const toneColors: Record<string, 'default' | 'primary' | 'success' | 'warning'> = {
    Formal: 'default',
    Casual: 'primary',
    Profesional: 'success',
    Amigable: 'warning',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wide">
        <div className="col-span-3">Nombre</div>
        <div className="col-span-2">Idioma</div>
        <div className="col-span-2">Tono</div>
        <div className="col-span-2">Respuestas</div>
        <div className="col-span-1">Audio</div>
        <div className="col-span-2 text-right">Acciones</div>
      </div>

      <ul className="divide-y divide-gray-200">
        {assistants.map((assistant) => (
          <li
            key={assistant.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
          
              <div className="col-span-3">
                <p className="font-medium text-gray-900">{assistant.name}</p>
              </div>

              <div className="col-span-2">
                <Badge variant="primary">{assistant.language}</Badge>
              </div>

              <div className="col-span-2">
                <Badge variant={toneColors[assistant.tone] || 'default'}>
                  {assistant.tone}
                </Badge>
              </div>

              <div className="col-span-2">
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100 w-full max-w-[120px]">
                  <div
                    className="bg-green-400"
                    style={{ width: `${assistant.responseLength.short}%` }}
                    title={`Cortas: ${assistant.responseLength.short}%`}
                  />
                  <div
                    className="bg-yellow-400"
                    style={{ width: `${assistant.responseLength.medium}%` }}
                    title={`Medianas: ${assistant.responseLength.medium}%`}
                  />
                  <div
                    className="bg-orange-400"
                    style={{ width: `${assistant.responseLength.long}%` }}
                    title={`Largas: ${assistant.responseLength.long}%`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {assistant.responseLength.short}/{assistant.responseLength.medium}/{assistant.responseLength.long}
                </p>
              </div>

              <div className="col-span-1">
                {assistant.audioEnabled ? (
                  <Volume2 className="w-5 h-5 text-green-500" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-300" />
                )}
              </div>

              <div className="col-span-2 flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(assistant)}
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTrain(assistant)}
                  title="Entrenar"
                >
                  <GraduationCap className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(assistant)}
                  title="Eliminar"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="md:hidden space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{assistant.name}</p>
                <div className="flex items-center gap-2">
                  {assistant.audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-300" />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{assistant.language}</Badge>
                <Badge variant={toneColors[assistant.tone] || 'default'}>
                  {assistant.tone}
                </Badge>
              </div>

              <div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
                  <div
                    className="bg-green-400"
                    style={{ width: `${assistant.responseLength.short}%` }}
                  />
                  <div
                    className="bg-yellow-400"
                    style={{ width: `${assistant.responseLength.medium}%` }}
                  />
                  <div
                    className="bg-orange-400"
                    style={{ width: `${assistant.responseLength.long}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Cortas: {assistant.responseLength.short}% · Medianas: {assistant.responseLength.medium}% · Largas: {assistant.responseLength.long}%
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(assistant)}
                  className="flex-1"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTrain(assistant)}
                  className="flex-1"
                >
                  <GraduationCap className="w-4 h-4" />
                  Entrenar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(assistant)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
