'use client';

import { useParams, useRouter } from 'next/navigation';
import { Bot, Globe, Volume2, MessageSquare, BarChart3 } from 'lucide-react';
import { Button, Badge, LoadingDots, Card } from '@/components/ui';
import { Header } from '@/components/layout';
import { TrainingSection, ChatSimulator } from '@/components/training';
import { useAssistants } from '@/hooks/useAssistants';

export default function TrainingPage() {
  const params = useParams();
  const router = useRouter();
  const { getAssistant, updateTraining, isLoaded } = useAssistants();

  const assistantId = params.id as string;
  const assistant = getAssistant(assistantId);

  const handleSaveTraining = (rules: string) => {
    updateTraining(assistantId, rules);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingDots text="Cargando..." />
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Asistente no encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            El asistente que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={() => router.push('/')}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const toneColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'orange'> = {
    Formal: 'default',
    Casual: 'orange',
    Profesional: 'success',
    Amigable: 'warning',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showBackButton 
        title={assistant.name}
        subtitle="Entrenamiento"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6" padding="md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{assistant.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-3.5 h-3.5" />
                  {assistant.language}
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200" />

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Tono */}
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <Badge variant={toneColors[assistant.tone] || 'default'} size="sm">
                  {assistant.tone}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <div className="flex gap-1 text-xs">
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded" title="Respuestas cortas">
                    C: {assistant.responseLength.short}%
                  </span>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded" title="Respuestas medianas">
                    M: {assistant.responseLength.medium}%
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#EB3C62]/10 text-[#EB3C62] rounded" title="Respuestas largas">
                    L: {assistant.responseLength.long}%
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-1.5 text-sm ${assistant.audioEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                <Volume2 className="w-4 h-4" />
                <span className="text-xs">
                  {assistant.audioEnabled ? 'Audio activo' : 'Sin audio'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrainingSection
            rules={assistant.rules}
            onSave={handleSaveTraining}
          />
          <ChatSimulator />
        </div>
      </main>
    </div>
  );
}
