'use client';

import { useRouter } from 'next/navigation';
import { Bot, Pencil, Trash2, GraduationCap, Volume2, Globe, MessageSquare } from 'lucide-react';
import { Assistant } from '@/types/assistant';
import { Badge, Button } from '@/components/ui';

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onDelete: (assistant: Assistant) => void;
}

export default function AssistantCard({ assistant, onEdit, onDelete }: AssistantCardProps) {
  const router = useRouter();

  const handleTrain = () => {
    router.push(`/${assistant.id}`);
  };

  const toneColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'orange'> = {
    Formal: 'default',
    Casual: 'orange',
    Profesional: 'success',
    Amigable: 'warning',
  };

  return (
    <article 
      className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 p-5"
      aria-label={`Asistente ${assistant.name}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors" aria-hidden="true">
            <Bot className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[180px]">
              {assistant.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Globe className="w-3 h-3" aria-hidden="true" />
                {assistant.language}
              </span>
              {assistant.audioEnabled && (
                <span className="text-xs text-[#EB3C62] flex items-center gap-1">
                  <Volume2 className="w-3 h-3" aria-hidden="true" />
                  Audio
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(assistant)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#EB3C62] transition-colors"
            aria-label={`Editar asistente ${assistant.name}`}
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(assistant)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            aria-label={`Eliminar asistente ${assistant.name}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <Badge variant={toneColors[assistant.tone] || 'default'} size="sm">
          <MessageSquare className="w-3 h-3 mr-1" />
          {assistant.tone}
        </Badge>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2" id={`response-length-${assistant.id}`}>Longitud de respuestas</p>
        <div 
          className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-gray-100"
          role="group"
          aria-labelledby={`response-length-${assistant.id}`}
        >
          <div
            className="bg-emerald-400"
            style={{ width: `${assistant.responseLength.short}%` }}
            role="progressbar"
            aria-valuenow={assistant.responseLength.short}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Respuestas cortas: ${assistant.responseLength.short}%`}
          />
          <div
            className="bg-amber-400"
            style={{ width: `${assistant.responseLength.medium}%` }}
            role="progressbar"
            aria-valuenow={assistant.responseLength.medium}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Respuestas medianas: ${assistant.responseLength.medium}%`}
          />
          <div
            className="bg-[#EB3C62]"
            style={{ width: `${assistant.responseLength.long}%` }}
            role="progressbar"
            aria-valuenow={assistant.responseLength.long}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Respuestas largas: ${assistant.responseLength.long}%`}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1" aria-hidden="true">
          <span>Cortas {assistant.responseLength.short}%</span>
          <span>Medianas {assistant.responseLength.medium}%</span>
          <span>Largas {assistant.responseLength.long}%</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={handleTrain}
        className="w-full"
        aria-label={`Entrenar asistente ${assistant.name}`}
      >
        <GraduationCap className="w-4 h-4" aria-hidden="true" />
        Entrenar
      </Button>
    </article>
  );
}
