'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bot, Globe, Sparkles, Volume2 } from 'lucide-react';
import { Button, Badge, Card, LoadingDots } from '@/components/ui';
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
            <ArrowLeft className="w-4 h-4" />
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver</span>
            </Button>

            <div className="h-6 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFAA4D] to-[#EB3C62] rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {assistant.name}
                </h1>
                <p className="text-xs text-gray-500">Entrenamiento</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6" padding="lg">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Información del Asistente
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EB3C62]/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#EB3C62]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Idioma</p>
                <p className="font-medium text-gray-900">{assistant.language}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFAA4D]/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FFAA4D]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Tono</p>
                <Badge variant={toneColors[assistant.tone] || 'default'} size="md">
                  {assistant.tone}
                </Badge>
              </div>
            </div>

            {/* Longitud de respuestas */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Longitud de respuestas</p>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                  Cortas: {assistant.responseLength.short}%
                </span>
                <span className="px-2 py-1 bg-[#FFAA4D]/20 text-[#D68A35] rounded">
                  Medianas: {assistant.responseLength.medium}%
                </span>
                <span className="px-2 py-1 bg-[#EB3C62]/10 text-[#EB3C62] rounded">
                  Largas: {assistant.responseLength.long}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  assistant.audioEnabled ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <Volume2
                  className={`w-5 h-5 ${
                    assistant.audioEnabled ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Audio</p>
                <p
                  className={`font-medium ${
                    assistant.audioEnabled ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {assistant.audioEnabled ? 'Habilitado' : 'Deshabilitado'}
                </p>
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
