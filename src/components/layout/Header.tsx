'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-2xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Funnelhot Logo"
              width={180}
              height={26}
              priority
              className="h-5 sm:h-6 lg:h-7 w-auto"
            />
          </div>

          <Button onClick={onCreateClick} variant="rose">
            
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Crear Asistente</span>
            <span className="sm:hidden">Crear</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
