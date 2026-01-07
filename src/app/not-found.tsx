'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-gray-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#FFAA4D] to-[#EB3C62] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#EB3C62]/20">
                <span className="text-4xl sm:text-5xl">🤖</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Nuestros asistentes IA no pueden ayudarte aquí.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#EB3C62] text-white font-medium rounded-lg hover:bg-[#d63456] transition-colors shadow-md shadow-[#EB3C62]/20"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
        </div>

        <p className="mt-12 text-sm text-gray-400">
          Funnelhot · Gestión de Asistentes IA
        </p>
      </div>
    </div>
  );
}
