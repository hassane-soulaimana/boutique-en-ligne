export default function ErrorMessage({ message = "Une erreur est survenue", onRetry }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-stone-700 text-lg mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
