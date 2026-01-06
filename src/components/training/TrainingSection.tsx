'use client';

import { useState } from 'react';
import { Button, Textarea } from '@/components/ui';
import { Save, CheckCircle } from 'lucide-react';

interface TrainingSectionProps {
  rules: string;
  onSave: (rules: string) => void;
}

export default function TrainingSection({ rules, onSave }: TrainingSectionProps) {
  const [content, setContent] = useState(rules);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Entrenamiento</h2>
      <p className="text-sm text-gray-500 mb-4">
        Define las instrucciones y reglas de comportamiento para tu asistente.
      </p>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe las instrucciones para el asistente. Por ejemplo: 'Eres un asistente de ventas amable. Siempre saluda al cliente y pregunta en qué puedes ayudar...'"
        rows={8}
        className="mb-4"
      />

      <div className="flex items-center justify-between">
        <div>
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-600 animate-in fade-in">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Guardado exitosamente</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleSave}
          isLoading={isSaving}
          disabled={!hasChanges && !isSaving}
        >
          <Save className="w-4 h-4" />
          Guardar Entrenamiento
        </Button>
      </div>
    </div>
  );
}
