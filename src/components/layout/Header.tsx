'use client';

import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onCreateClick?: () => void;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onBackClick?: () => void; // Callback personalizado para el botón volver
}

export default function Header({ 
  onCreateClick, 
  showBackButton = false,
  title,
  subtitle,
  rightContent,
  onBackClick 
}: HeaderProps) {
  const router = useRouter();

  // Usar callback personalizado o navegación por defecto
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.push('/');
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 flex-shrink-0" role="banner">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-2xl" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackClick}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Volver al inicio"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Volver</span>
                </Button>
                <div className="h-5 w-px bg-gray-700" />
              </>
            )}
            
            <a href="/" aria-label="Ir al inicio - Funnelhot" className="flex items-center">
              <Image
                src="/logo.svg"
                alt=""
                width={140}
                height={22}
                priority
                className="h-5 sm:h-6 w-auto"
                aria-hidden="true"
              />
              <span className="sr-only">Funnelhot</span>
            </a>

            {title && (
              <>
                <div className="hidden sm:block h-5 w-px bg-gray-700" />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                  {subtitle && <p className="text-xs text-gray-400 leading-tight">{subtitle}</p>}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {rightContent}
            
            {onCreateClick && (
              <Button onClick={onCreateClick} variant="primary" aria-label="Crear nuevo asistente">            
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Crear Asistente</span>
                <span className="sm:hidden">Crear</span>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
