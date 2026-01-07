'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Assistant, AssistantFormData } from '@/types/assistant';
import { initialAssistants } from '@/data/initialAssistants';

// Clave para almacenar los asistentes en localStorage
const STORAGE_KEY = 'funnelhot_assistants';

/**
 * Hook personalizado para gestionar el CRUD de asistentes IA
 * Proporciona funciones para crear, leer, actualizar y eliminar asistentes
 * con persistencia automática en localStorage
 */
export function useAssistants() {
  const { storedValue: assistants, setValue: setAssistants, isLoaded } = useLocalStorage<Assistant[]>(
    STORAGE_KEY,
    initialAssistants
  );

  /**
   * Genera un ID único para nuevos asistentes
   * Combina timestamp y string aleatorio para garantizar unicidad
   */
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  /**
   * Obtiene un asistente por su ID
   * @param id - ID del asistente a buscar
   * @returns El asistente encontrado o undefined
   */
  const getAssistant = useCallback(
    (id: string): Assistant | undefined => {
      return assistants.find((assistant) => assistant.id === id);
    },
    [assistants]
  );

  /**
   * Crea un nuevo asistente
   * @param data - Datos del formulario de creación
   * @returns El asistente creado con su ID generado
   */
  const createAssistant = useCallback(
    (data: AssistantFormData): Assistant => {
      const newAssistant: Assistant = {
        id: generateId(),
        name: data.name,
        language: data.language as Assistant['language'],
        tone: data.tone as Assistant['tone'],
        responseLength: data.responseLength,
        audioEnabled: data.audioEnabled,
        rules: '', // Las reglas se agregan en la página de entrenamiento
      };

      setAssistants((prev) => [...prev, newAssistant]);
      return newAssistant;
    },
    [setAssistants]
  );

  /**
   * Actualiza un asistente existente
   * @param id - ID del asistente a actualizar
   * @param data - Datos parciales a actualizar
   * @returns true si se actualizó, false si no se encontró
   */
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

  /**
   * Elimina un asistente
   * @param id - ID del asistente a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  const deleteAssistant = useCallback(
    (id: string): boolean => {
      const index = assistants.findIndex((a) => a.id === id);
      if (index === -1) return false;

      setAssistants((prev) => prev.filter((assistant) => assistant.id !== id));
      return true;
    },
    [assistants, setAssistants]
  );

  /**
   * Actualiza las reglas de entrenamiento de un asistente
   * @param id - ID del asistente
   * @param rules - Nuevas reglas/instrucciones de entrenamiento
   */
  const updateTraining = useCallback(
    (id: string, rules: string): boolean => {
      return updateAssistant(id, { rules });
    },
    [updateAssistant]
  );

  return {
    assistants,        // Lista de todos los asistentes
    isLoaded,          // Indica si los datos ya se cargaron de localStorage
    getAssistant,      // Obtener un asistente por ID
    createAssistant,   // Crear nuevo asistente
    updateAssistant,   // Actualizar asistente existente
    deleteAssistant,   // Eliminar asistente
    updateTraining,    // Actualizar reglas de entrenamiento
  };
}
