export function CardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl md:rounded-3xl p-6 animate-pulse">
      <div className="h-48 bg-dark-300 rounded-xl mb-4"></div>
      <div className="h-6 bg-dark-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-dark-300 rounded w-1/2"></div>
    </div>
  );
}

export function TextSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-dark-300 rounded w-full"></div>
      <div className="h-4 bg-dark-300 rounded w-5/6"></div>
      <div className="h-4 bg-dark-300 rounded w-4/6"></div>
    </div>
  );
}

