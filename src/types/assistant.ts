
export interface ResponseLength {
  short: number;  
  medium: number; 
  long: number;   
}

export interface Assistant {
  id: string;
  name: string;
  language: Language;
  tone: Tone;
  responseLength: ResponseLength;
  audioEnabled: boolean;
  rules: string; 
}

export type Language = 'Español' | 'Inglés' | 'Portugués';
export type Tone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface AssistantStepOne {
  name: string;
  language: Language | '';
  tone: Tone | '';
}

export interface AssistantStepTwo {
  responseLength: ResponseLength;
  audioEnabled: boolean;
}

export interface AssistantFormData extends AssistantStepOne, AssistantStepTwo {}

export const LANGUAGE_OPTIONS: Language[] = ['Español', 'Inglés', 'Portugués'];
export const TONE_OPTIONS: Tone[] = ['Formal', 'Casual', 'Profesional', 'Amigable'];
