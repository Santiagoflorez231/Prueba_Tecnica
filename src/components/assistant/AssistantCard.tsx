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
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Bot className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[180px]">
              {assistant.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {assistant.language}
              </span>
              {assistant.audioEnabled && (
                <span className="text-xs text-[#EB3C62] flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  Audio
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(assistant)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(assistant)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
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
        <p className="text-xs text-gray-500 mb-2">Longitud de respuestas</p>
        <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-gray-100">
          <div
            className="bg-emerald-400"
            style={{ width: `${assistant.responseLength.short}%` }}
          />
          <div
            className="bg-amber-400"
            style={{ width: `${assistant.responseLength.medium}%` }}
          />
          <div
            className="bg-[#EB3C62]"
            style={{ width: `${assistant.responseLength.long}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
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
      >
        <GraduationCap className="w-4 h-4" />
        Entrenar
      </Button>
    </div>
  );
}
