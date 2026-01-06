'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Input } from '@/components/ui';
import { Send, RotateCcw, Loader2, MessageCircle } from 'lucide-react';
import { ChatMessage } from '@/types/assistant';
import { getRandomResponse } from '@/data/chatResponses';
import ChatMessageItem from './ChatMessage';

const MAX_MESSAGE_LENGTH = 500;

export default function ChatSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInput(value);
    }
  };

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;
    if (trimmedInput.length > MAX_MESSAGE_LENGTH) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      content: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const assistantMessage: ChatMessage = {
      id: generateId(),
      content: getRandomResponse(),
      sender: 'assistant',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false);
  };

  const isNearLimit = input.length > MAX_MESSAGE_LENGTH * 0.8;

  return (
    <section 
      className="bg-white rounded-xl shadow-sm flex flex-col h-full min-h-[400px]"
      aria-labelledby="chat-title"
    >
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 id="chat-title" className="text-lg font-semibold text-gray-900">
            Simulador de Chat
          </h2>
          <p className="text-sm text-gray-500">
            Prueba cómo responderá tu asistente
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          disabled={messages.length === 0 && !input}
          aria-label="Reiniciar conversación"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </Button>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
        role="log"
        aria-live="polite"
        aria-label="Historial de mensajes"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm text-center">
              Envía un mensaje para comenzar<br />
              la conversación de prueba
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex gap-3 items-center" aria-label="El asistente está escribiendo">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                </div>
                <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-xl">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje de prueba..."
              disabled={isTyping}
              aria-label="Mensaje para el chat"
              maxLength={MAX_MESSAGE_LENGTH}
            />
            {input.length > 0 && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isNearLimit ? 'text-amber-600' : 'text-gray-400'}`}>
                {input.length}/{MAX_MESSAGE_LENGTH}
              </span>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
