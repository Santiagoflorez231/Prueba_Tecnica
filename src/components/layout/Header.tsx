'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40" role="banner">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-2xl" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <a href="/" aria-label="Ir al inicio - Funnelhot">
              <Image
                src="/logo.svg"
                alt=""
                width={180}
                height={26}
                priority
                className="h-5 sm:h-6 lg:h-7 w-auto"
                aria-hidden="true"
              />
              <span className="sr-only">Funnelhot</span>
            </a>
          </div>

          <Button onClick={onCreateClick} variant="primary" aria-label="Crear nuevo asistente">            
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Crear Asistente</span>
            <span className="sm:hidden">Crear</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
