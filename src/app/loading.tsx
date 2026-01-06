export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-rose-500 animate-bounce [animation-delay:-.5s]" />
      </div>
      <p className="text-gray-500 text-sm">Cargando...</p>
    </div>
  );
}
