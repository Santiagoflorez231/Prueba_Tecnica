'use client';

import { useState } from 'react';
import { Button, Textarea } from '@/components/ui';
import { Save, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface TrainingSectionProps {
  rules: string;
  onSave: (rules: string) => void;
}

const MIN_CHARS = 20;
const MAX_CHARS = 5000;

export default function TrainingSection({ rules, onSave }: TrainingSectionProps) {
  const [content, setContent] = useState(rules);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validateContent = (value: string): string | null => {
    if (value.trim().length === 0) {
      return 'Las instrucciones no pueden estar vacías';
    }
    if (value.trim().length < MIN_CHARS) {
      return `Las instrucciones deben tener al menos ${MIN_CHARS} caracteres`;
    }
    if (value.length > MAX_CHARS) {
      return `Las instrucciones no pueden exceder ${MAX_CHARS} caracteres`;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    if (touched) {
      setError(validateContent(value));
    }
    setShowSuccess(false);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateContent(content));
  };

  const handleSave = async () => {
    setTouched(true);
    const validationError = validateContent(content);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSaving(true);
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onSave(content);
    setIsSaving(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const hasChanges = content !== rules;
  const charCount = content.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;

  return (
    <section 
      className="bg-white rounded-xl shadow-sm flex flex-col h-full"
      aria-labelledby="training-title"
    >
      <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="training-title" className="text-lg font-semibold text-gray-900">
              Instrucciones de Entrenamiento
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Define cómo debe comportarse y responder tu asistente.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
            <Info className="w-3 h-3" />
            <span>Mín. {MIN_CHARS} caracteres</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-4">
        <div className="h-full flex flex-col">
          <Textarea
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={`Ejemplo:\n\nEres un asistente de ventas para Funnelhot. Tu objetivo es ayudar a los usuarios a entender nuestros productos y servicios.\n\nReglas:\n- Siempre saluda de forma amigable\n- Responde de manera concisa pero completa\n- Si no sabes algo, admítelo honestamente\n- Sugiere agendar una llamada cuando sea apropiado`}
            className={`flex-1 min-h-[200px] resize-none ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
            aria-describedby={error ? 'training-error' : 'training-helper'}
            aria-invalid={!!error}
          />
          
          <div className="flex items-center justify-between mt-2 text-xs">
            <div>
              {error ? (
                <p id="training-error" className="text-red-600 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              ) : (
                <p id="training-helper" className="text-gray-400">
                  Escribe instrucciones claras y específicas para mejores resultados.
                </p>
              )}
            </div>
            <span className={`tabular-nums ${isNearLimit ? 'text-amber-600 font-medium' : 'text-gray-400'}`}>
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-5 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="min-h-[24px]">
            {showSuccess && (
              <div className="flex items-center gap-2 text-green-600 animate-in fade-in" role="status">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Cambios guardados correctamente</span>
              </div>
            )}
            {hasChanges && !showSuccess && !error && (
              <p className="text-sm text-amber-600">Tienes cambios sin guardar</p>
            )}
          </div>

          <Button
            onClick={handleSave}
            isLoading={isSaving}
            disabled={(!hasChanges && !isSaving) || !!error}
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </section>
  );
}
