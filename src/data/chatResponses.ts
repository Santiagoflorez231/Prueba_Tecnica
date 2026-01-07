export const simulatedResponses: string[] = [
  'Entendido, ¿en qué más puedo ayudarte?',
  'Esa es una excelente pregunta. Déjame explicarte...',
  'Claro, con gusto te ayudo con eso.',
  '¿Podrías darme más detalles sobre tu consulta?',
  'Perfecto, he registrado esa información.',
  '¡Gracias por tu mensaje! Estoy procesando tu solicitud.',
  'Interesante punto de vista. Permíteme darte mi opinión.',
  'Entiendo tu situación. Aquí tienes algunas opciones...',
  '¡Excelente elección! ¿Hay algo más que necesites?',
  'Déjame verificar eso por ti. Un momento por favor.',
];

/**
 * Obtiene una respuesta aleatoria del array de respuestas simuladas
 */
export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * simulatedResponses.length);
  return simulatedResponses[randomIndex];
};
