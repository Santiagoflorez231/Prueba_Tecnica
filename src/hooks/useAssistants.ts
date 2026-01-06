'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Assistant, AssistantFormData } from '@/types/assistant';
import { initialAssistants } from '@/data/initialAssistants';

const STORAGE_KEY = 'funnelhot_assistants';

/**
 * Hook para manejar todas las operaciones CRUD de asistentes
 */
export function useAssistants() {
  const { storedValue: assistants, setValue: setAssistants, isLoaded } = useLocalStorage<Assistant[]>(
    STORAGE_KEY,
    initialAssistants
  );

  // Generar ID único
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Obtener un asistente por ID
  const getAssistant = useCallback(
    (id: string): Assistant | undefined => {
      return assistants.find((assistant) => assistant.id === id);
    },
    [assistants]
  );

  // Crear nuevo asistente
  const createAssistant = useCallback(
    (data: AssistantFormData): Assistant => {
      const newAssistant: Assistant = {
        id: generateId(),
        name: data.name,
        language: data.language as Assistant['language'],
        tone: data.tone as Assistant['tone'],
        responseLength: data.responseLength,
        audioEnabled: data.audioEnabled,
        rules: '',
      };

      setAssistants((prev) => [...prev, newAssistant]);
      return newAssistant;
    },
    [setAssistants]
  );

  // Actualizar asistente existente
  const updateAssistant = useCallback(
    (id: string, data: Partial<Assistant>): boolean => {
      const index = assistants.findIndex((a) => a.id === id);
      if (index === -1) return false;

      setAssistants((prev) =>
        prev.map((assistant) =>
          assistant.id === id ? { ...assistant, ...data } : assistant
        )
      );
      return true;
    },
    [assistants, setAssistants]
  );

  // Eliminar asistente
  const deleteAssistant = useCallback(
    (id: string): boolean => {
      const index = assistants.findIndex((a) => a.id === id);
      if (index === -1) return false;

      setAssistants((prev) => prev.filter((assistant) => assistant.id !== id));
      return true;
    },
    [assistants, setAssistants]
  );

  // Actualizar reglas de entrenamiento
  const updateTraining = useCallback(
    (id: string, rules: string): boolean => {
      return updateAssistant(id, { rules });
    },
    [updateAssistant]
  );

  return {
    assistants,
    isLoaded,
    getAssistant,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    updateTraining,
  };
}
