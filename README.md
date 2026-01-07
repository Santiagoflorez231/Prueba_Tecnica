# Módulo de Gestión de Asistentes IA

Implementación de la prueba técnica para Funnelhot. Un sistema web para gestionar asistentes de IA que automatizan interacciones con leads.

## Instrucciones para correr el proyecto

```bash
git clone https://github.com/Santiagoflorez231/Prueba_Tecnica.git
cd Prueba_Tecnica
npm install
npm run dev
```

Abre http://localhost:3000

## Características implementadas

**Funcionalidades requeridas:**
- CRUD completo de asistentes
- Modal de creación/edición en 2 pasos con validaciones
- Página de entrenamiento con área de texto e instrucciones
- Simulador de chat con respuestas automáticas (delay 1-2 segundos para simular el razonamiento)
- Persistencia en localStorage
- Responsive design
- Estados de carga y error

**Extras agregados:**
- Buscador por nombre, idioma y tono
- Paginación (6 por página)
- Vista de tarjetas y lista
- Notificaciones de confirmación al crear/editar/eliminar
- Modal de advertencia si intentas salir con cambios sin guardar
- Página 404 personalizada

## Decisiones técnicas

**Next.js con App Router**

Es de mis primeras veces usando Next.js. Vengo de React con TypeScript, así que al inicio me costó entender el App Router y la estructura de carpetas, pero después de investigar un rato me pareció interesante. Me gustó mucho la experiencia de desarrollo.

**Componentes UI**

Hice mis propios componentes como Button, Input, etc. y también tomé algunos de UniverseUI lo que me permitió tener una base sólida y a la vez personalizada

**LocalStorage con custom hook**

Para la persistencia usé localStorage envuelto en un hook (`useLocalStorage`). Es más limpio que repetir la lógica en cada componente y maneja bien el SSR de Next.js

**Decisión de diseño**

Investigué sobre la empresa y usé sus colores principales (naranja #FFAA4D y rosa #EB3C62) para que el diseño se sienta coherente con su marca, además de usar un diseño similar al de la empresa para que se sienta familiar

## Tiempo dedicado: ~20 horas

No fueron solo 20 horas de código directo. El tiempo se dividió así:

**Investigación (2-3 horas)**
Antes de escribir código, investigué sobre Funnelhot y cómo funcionan los negocios de asistentes IA. Quería entender el contexto para que el diseño tuviera sentido. Me ayudó a visualizar cómo debería verse el producto.

**Aprendizaje de Next.js (4-6 horas)**
Nunca había usado Next.js. Pasé tiempo entendiendo el App Router, el file-based routing, cómo funcionan los layouts y los loading states. Fue lo que más me costó al principio, pero valió la pena. Aún me falta mucho por aprender, pero ya tengo una buena base.

**Desarrollo (10-11 horas)**
El código en sí: estructura del proyecto, CRUD, página de entrenamiento, refinamientos de UI, y los extras como el buscador y la paginación, reutilice componentes que ya tenia de proyectos anteriores y los adapte para acelerar el desarrollo, lo cual me permitió enfocarme en la lógica y funcionalidades

## Lo que prioricé

1. **Aprender Next.js bien** - No quería solo hacer que funcionara, quería entender por qué y como funciona
2. **Entender el negocio** - Investigar sobre Funnelhot y la industria
3. **Que todo lo requerido funcionara correctamente**
4. **Experiencia de usuario** - Validaciones, feedback visual, transiciones
5. **Diseño coherente con la marca**

## Lo que dejé fuera
- Dark mode (consideré el tiempo y decidí no implementarlo, pero note que en la empresa se usa mucho los colores oscuros)
- Drag and drop para reordenar, aunque lo consideré debido a mi experiencia previa con swapy

## Stack

- Next.js 16.1.1
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Lucide React (iconos)

## Reflexión

Esta prueba fue interesante. Me gustó Next.js más de lo que esperaba y tiene sentido por qué tanta gente lo usa. También me motivó ver que puedo aprender una herramienta nueva y hacer algo funcional en tiempo limitado. La parte de investigar sobre Funnelhot y los asistentes IA me ayudó a darle contexto a lo que estaba construyendo y me hizo visualizar, mas o menos que se espera de un producto así
---

Santiago Florez  
GitHub: @Santiagoflorez231
Email: santiagoflorezv23@gmail.com
