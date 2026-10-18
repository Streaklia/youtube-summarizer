export function LoadingSpinner() {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-gray-700" />
      <div className="absolute inset-0 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
    </div>
  );
}
