export function ResultModal({ open, type, onContinue, onRetry }) {
  if (!open) return null

  const isWin = type === 'win'
  const title = isWin ? '¡Felicidades, Buen trabajo!' : '¡Aghh!, Vuelve a internar lo.'
  const desc = isWin
    ? 'Completaste el nivel al 100%.'
    : 'Se te acabaron las vidas. ¿Quieres intentarlo de nuevo?'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-10">{desc}</p>

        {isWin ? (
          <button
            onClick={onContinue}
            className="px-10 py-4 rounded-full text-2xl font-bold bg-black text-white hover:bg-gray-800"
          >
            Continuar
          </button>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={onRetry}
              className="px-8 py-4 rounded-full text-2xl font-bold bg-blue-600 text-white hover:bg-blue-700"
            >
              Volver a intentar
            </button>
            <button
              onClick={onContinue}
              className="px-8 py-4 rounded-full text-2xl font-bold bg-gray-200 hover:bg-gray-300"
            >
              Menú de niveles
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
