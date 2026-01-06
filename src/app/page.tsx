'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Header } from '@/components/layout';
import { LoadingDots } from '@/components/ui';
import {
  AssistantCard,
  AssistantList,
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
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingDots text="Cargando..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateClick={handleCreateClick} />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-2xl py-6 sm:py-8 lg:py-10">
        {assistants.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Mis Asistentes
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {assistants.length} asistente{assistants.length !== 1 ? 's' : ''} creado{assistants.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Toggle de vista */}
              <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-[#EB3C62] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Vista de tarjetas"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#EB3C62] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Vista de lista"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {viewMode === 'cards' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {assistants.map((assistant) => (
                  <AssistantCard
                    key={assistant.id}
                    assistant={assistant}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <AssistantList
                assistants={assistants}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            )}
          </>
        )}
      </main>

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
