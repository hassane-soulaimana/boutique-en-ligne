export default function LoadingSpinner({ message = "Chargement..." }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-600">{message}</p>
      </div>
    </div>
  );
}
