import { ChatMessage } from '@/types/assistant';
import { Bot, User } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isAssistant = message.sender === 'assistant';

  return (
    <div
      className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {isAssistant && (
        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-violet-600" />
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
          isAssistant
            ? 'bg-gray-100 text-gray-900 rounded-tl-none'
            : 'bg-violet-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isAssistant ? 'text-gray-400' : 'text-violet-200'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
}
