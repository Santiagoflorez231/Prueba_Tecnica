/**
 * Tipos y interfaces para el módulo de Asistentes IA
 * Define la estructura de datos utilizada en toda la aplicación
 */

/**
 * Configuración de longitud de respuestas del asistente
 * Los porcentajes deben sumar 100%
 */
export interface ResponseLength {
  short: number;   // Porcentaje de respuestas cortas
  medium: number;  // Porcentaje de respuestas medianas
  long: number;    // Porcentaje de respuestas largas
}

/**
 * Interfaz principal del Asistente IA
 * Contiene toda la configuración y datos del asistente
 */
export interface Assistant {
  id: string;                    // Identificador único
  name: string;                  // Nombre del asistente
  language: Language;            // Idioma de comunicación
  tone: Tone;                    // Tono/personalidad
  responseLength: ResponseLength; // Configuración de longitud
  audioEnabled: boolean;         // Si tiene respuestas de audio habilitadas
  rules: string;                 // Instrucciones de entrenamiento
}

export type Language = 'Español' | 'Inglés' | 'Portugués';

export type Tone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';

/**
 * Mensaje del chat simulado
 */
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Datos del paso 1 del formulario de creación/edición
export interface AssistantStepOne {
  name: string;
  language: Language | '';
  tone: Tone | '';
}

// Datos del paso 2 del formulario de creación/edición
export interface AssistantStepTwo {
  responseLength: ResponseLength;
  audioEnabled: boolean;
}

// Datos completos del formulario (combina ambos pasos)
export interface AssistantFormData extends AssistantStepOne, AssistantStepTwo {}

// Opciones disponibles para selects
export const LANGUAGE_OPTIONS: Language[] = ['Español', 'Inglés', 'Portugués'];
export const TONE_OPTIONS: Tone[] = ['Formal', 'Casual', 'Profesional', 'Amigable'];
