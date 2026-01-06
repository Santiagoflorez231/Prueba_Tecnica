import { AssistantStepOne, ResponseLength } from '@/types/assistant';

// Errores de validación
export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Valida los datos del paso 1 del formulario
 */
export function validateStepOne(data: AssistantStepOne): ValidationErrors {
  const errors: ValidationErrors = {};

  // Validar nombre
  if (!data.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (data.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  // Validar idioma
  if (!data.language) {
    errors.language = 'El idioma es requerido';
  }

  // Validar tono
  if (!data.tone) {
    errors.tone = 'El tono es requerido';
  }

  return errors;
}

/**
 * Valida los datos del paso 2 del formulario
 */
export function validateStepTwo(responseLength: ResponseLength): ValidationErrors {
  const errors: ValidationErrors = {};
  const total = responseLength.short + responseLength.medium + responseLength.long;

  if (total !== 100) {
    errors.responseLength = `La suma de las longitudes debe ser 100% (actualmente: ${total}%)`;
  }

  // Validar que no haya valores negativos
  if (responseLength.short < 0 || responseLength.medium < 0 || responseLength.long < 0) {
    errors.responseLength = 'Los valores no pueden ser negativos';
  }

  // Validar que no excedan 100 individualmente
  if (responseLength.short > 100 || responseLength.medium > 100 || responseLength.long > 100) {
    errors.responseLength = 'Ningún valor puede exceder 100%';
  }

  return errors;
}

/**
 * Verifica si hay errores de validación
 */
export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Calcula el porcentaje restante
 */
export function calculateRemaining(responseLength: ResponseLength): number {
  const total = responseLength.short + responseLength.medium + responseLength.long;
  return 100 - total;
}
