import { Bot, Plus } from 'lucide-react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6">
        <Bot className="w-10 h-10 text-violet-600" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        No hay asistentes creados
      </h2>
      
      <p className="text-gray-500 text-center max-w-md mb-8">
        Comienza creando tu primer asistente de IA para automatizar las interacciones con tus leads.
      </p>
      
      <Button onClick={onCreateClick} size="lg">
        <Plus className="w-5 h-5" />
        Crear Asistente
      </Button>
    </div>
  );
}
