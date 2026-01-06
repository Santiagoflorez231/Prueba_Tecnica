interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingDots({ size = 'md', text }: LoadingDotsProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-2">
        <div className={`${sizes[size]} rounded-full bg-rose-500 animate-bounce`} />
        <div className={`${sizes[size]} rounded-full bg-rose-500 animate-bounce [animation-delay:-.3s]`} />
        <div className={`${sizes[size]} rounded-full bg-rose-500 animate-bounce [animation-delay:-.5s]`} />
      </div>
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
}
