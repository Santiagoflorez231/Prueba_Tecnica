'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from '@/components/ui';
import {
  Assistant,
  AssistantFormData,
  AssistantStepOne,
  ResponseLength,
  LANGUAGE_OPTIONS,
  TONE_OPTIONS,
} from '@/types/assistant';
import {
  validateStepOne,
  validateStepTwo,
  hasErrors,
  ValidationErrors,
} from '@/utils/validation';
import { Check } from 'lucide-react';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AssistantFormData) => void;
  assistant?: Assistant | null; 
}

const initialStepOne: AssistantStepOne = {
  name: '',
  language: '',
  tone: '',
};

const initialResponseLength: ResponseLength = {
  short: 33,
  medium: 34,
  long: 33,
};

export default function AssistantModal({
  isOpen,
  onClose,
  onSave,
  assistant,
}: AssistantModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<AssistantStepOne>(initialStepOne);
  const [responseLength, setResponseLength] = useState<ResponseLength>(initialResponseLength);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (assistant) {
      setStepOneData({
        name: assistant.name,
        language: assistant.language,
        tone: assistant.tone,
      });
      setResponseLength(assistant.responseLength);
      setAudioEnabled(assistant.audioEnabled);
    } else {
      // Reset form para creación
      setStepOneData(initialStepOne);
      setResponseLength(initialResponseLength);
      setAudioEnabled(false);
    }
    setCurrentStep(1);
    setErrors({});
  }, [assistant, isOpen]);

  const handleStepOneChange = (field: keyof AssistantStepOne, value: string) => {
    setStepOneData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleResponseLengthChange = (field: keyof ResponseLength, value: number) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    setResponseLength((prev) => ({ ...prev, [field]: clampedValue }));
    if (errors.responseLength) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.responseLength;
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const stepOneErrors = validateStepOne(stepOneData);
    if (hasErrors(stepOneErrors)) {
      setErrors(stepOneErrors);
      return;
    }
    setErrors({});
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSave = async () => {
    const stepTwoErrors = validateStepTwo(responseLength);
    if (hasErrors(stepTwoErrors)) {
      setErrors(stepTwoErrors);
      return;
    }

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    const formData: AssistantFormData = {
      ...stepOneData,
      responseLength,
      audioEnabled,
    };

    onSave(formData);
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setStepOneData(initialStepOne);
    setResponseLength(initialResponseLength);
    setAudioEnabled(false);
    setErrors({});
    onClose();
  };

  const total = responseLength.short + responseLength.medium + responseLength.long;
  const isValidTotal = total === 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={assistant ? 'Editar Asistente' : 'Crear Asistente'}
      size="lg"
    >
      <div className="px-6 pt-2 pb-4">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentStep >= 1
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-sm ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
              Datos Básicos
            </span>
          </div>

          <div className="w-12 h-0.5 bg-gray-200">
            <div
              className={`h-full transition-all ${
                currentStep >= 2 ? 'bg-violet-600 w-full' : 'w-0'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentStep >= 2
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
            <span className={`text-sm ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
              Configuración
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {currentStep === 1 ? (
          <div className="space-y-4">
            <Input
              label="Nombre del asistente"
              placeholder="Ej: Asistente de Ventas"
              value={stepOneData.name}
              onChange={(e) => handleStepOneChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Select
              label="Idioma"
              placeholder="Selecciona un idioma"
              value={stepOneData.language}
              onChange={(e) => handleStepOneChange('language', e.target.value)}
              options={LANGUAGE_OPTIONS.map((lang) => ({ value: lang, label: lang }))}
              error={errors.language}
              required
            />

            <Select
              label="Tono / Personalidad"
              placeholder="Selecciona un tono"
              value={stepOneData.tone}
              onChange={(e) => handleStepOneChange('tone', e.target.value)}
              options={TONE_OPTIONS.map((tone) => ({ value: tone, label: tone }))}
              error={errors.tone}
              required
            />
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Longitud de respuestas <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Define el porcentaje de cada tipo de respuesta. La suma debe ser 100%.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-gray-600">Respuestas cortas</span>
                    <span className="text-sm font-medium text-gray-900">
                      {responseLength.short}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={responseLength.short}
                    onChange={(e) =>
                      handleResponseLengthChange('short', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-gray-600">Respuestas medianas</span>
                    <span className="text-sm font-medium text-gray-900">
                      {responseLength.medium}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={responseLength.medium}
                    onChange={(e) =>
                      handleResponseLengthChange('medium', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-gray-600">Respuestas largas</span>
                    <span className="text-sm font-medium text-gray-900">
                      {responseLength.long}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={responseLength.long}
                    onChange={(e) =>
                      handleResponseLengthChange('long', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>

              <div
                className={`mt-4 p-3 rounded-lg ${
                  isValidTotal ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      isValidTotal ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    Total
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      isValidTotal ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {total}%
                  </span>
                </div>
                {!isValidTotal && (
                  <p className="text-xs text-red-600 mt-1">
                    La suma debe ser exactamente 100%
                  </p>
                )}
              </div>

              {errors.responseLength && (
                <p className="mt-2 text-sm text-red-600">{errors.responseLength}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="audioEnabled"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500"
              />
              <label htmlFor="audioEnabled" className="text-sm text-gray-700">
                Habilitar respuestas de audio
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-between">
        {currentStep === 1 ? (
          <>
            <Button variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button onClick={handleSave} isLoading={isSubmitting}>
              {assistant ? 'Guardar Cambios' : 'Crear Asistente'}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
