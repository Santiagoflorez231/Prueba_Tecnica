import { Bot, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#FFAA4D] to-[#EB3C62] rounded-2xl flex items-center justify-center shadow-lg shadow-[#EB3C62]/20">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-[#FFAA4D]" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        No hay asistentes creados
      </h2>
      
      <p className="text-gray-500 text-center max-w-md mb-8">
        Comienza creando tu primer asistente de IA para automatizar las interacciones con tus leads.
      </p>
      
      <Button onClick={onCreateClick} size="lg">
        <Plus className="w-5 h-5" />
        Crear mi primer Asistente
      </Button>
    </div>
  );
}
