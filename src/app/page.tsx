'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Header } from '@/components/layout';
import { LoadingDots, Pagination, SearchInput } from '@/components/ui';
import {
  AssistantCard,
  AssistantList,
  AssistantModal,
  DeleteConfirmModal,
  EmptyState,
} from '@/components/assistant';
import { useAssistants } from '@/hooks/useAssistants';
import { Assistant, AssistantFormData } from '@/types/assistant';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const { assistants, isLoaded, createAssistant, updateAssistant, deleteAssistant } =
    useAssistants();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAssistants = useMemo(() => {
    if (!searchQuery.trim()) return assistants;
    
    const query = searchQuery.toLowerCase();
    return assistants.filter(
      (assistant) =>
        assistant.name.toLowerCase().includes(query) ||
        assistant.language.toLowerCase().includes(query) ||
        assistant.tone.toLowerCase().includes(query)
    );
  }, [assistants, searchQuery]);

  const totalPages = Math.ceil(filteredAssistants.length / ITEMS_PER_PAGE);
  const paginatedAssistants = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssistants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAssistants, currentPage]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      <main id="main-content" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-2xl py-6 sm:py-8 lg:py-10">
        {assistants.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Mis Asistentes
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredAssistants.length === assistants.length
                    ? `${assistants.length} asistente${assistants.length !== 1 ? 's' : ''} creado${assistants.length !== 1 ? 's' : ''}`
                    : `${filteredAssistants.length} de ${assistants.length} asistentes`}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex-1 sm:w-64">
                  <SearchInput
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Buscar asistente..."
                  />
                </div>

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
            </div>

            {paginatedAssistants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron asistentes para "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-[#EB3C62] hover:underline text-sm"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {paginatedAssistants.map((assistant) => (
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
                    assistants={paginatedAssistants}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredAssistants.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </>
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
