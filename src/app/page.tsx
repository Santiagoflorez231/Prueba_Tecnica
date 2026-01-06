'use client';

import { useState } from 'react';
import { Plus, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  AssistantCard,
  AssistantModal,
  DeleteConfirmModal,
  EmptyState,
} from '@/components/assistant';
import { useAssistants } from '@/hooks/useAssistants';
import { Assistant, AssistantFormData } from '@/types/assistant';

export default function HomePage() {
  const { assistants, isLoaded, createAssistant, updateAssistant, deleteAssistant } =
    useAssistants();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateClick = () => {
    setSelectedAssistant(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (data: AssistantFormData) => {
    if (selectedAssistant) {
      updateAssistant(selectedAssistant.id, {
        name: data.name,
        language: data.language as Assistant['language'],
        tone: data.tone as Assistant['tone'],
        responseLength: data.responseLength,
        audioEnabled: data.audioEnabled,
      });
    } else {
      createAssistant(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAssistant) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    deleteAssistant(selectedAssistant.id);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setSelectedAssistant(null);
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Funnelhot</h1>
                <p className="text-xs text-gray-500">Gestión de Asistentes IA</p>
              </div>
            </div>

            <Button onClick={handleCreateClick}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Crear Asistente</span>
              <span className="sm:hidden">Crear</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {assistants.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Mis Asistentes
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {assistants.length} asistente{assistants.length !== 1 ? 's' : ''} creado{assistants.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistants.map((assistant) => (
                <AssistantCard
                  key={assistant.id}
                  assistant={assistant}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modales */}
      <AssistantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        assistant={selectedAssistant}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        assistant={selectedAssistant}
        isDeleting={isDeleting}
      />
    </div>
  );
}
