export function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping" />
        {/* Track */}
        <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>
      </div>
      {label && (
        <p className="text-sm text-gray-500 animate-pulse">{label}</p>
      )}
    </div>
  );
}
