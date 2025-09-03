import { useNavigate } from "react-router-dom"
import { useUserProgress } from "../../shared/hooks/Progress/useProgress"
import { useEffect, useState } from "react"
import { useLevels } from "../../shared/hooks/Levels/useLevels"

export const ProgressPage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [porcentaje, setPorcentaje] = useState(20)
  const [completed, setCompleted] = useState([])
  const { progress, loadProgress } = useUserProgress()
  const { getLevels, allLevels } = useLevels()
  const MEDIA_BASE = "http://localhost:2636/uploads/img/levels"

  useEffect(() => {
    loadProgress(user.uid)
    getLevels()
  }, [])

  useEffect(() => {
    if (progress) {
      let result =
        (100 * progress.levelsCompleted.length) /
        (progress.blockedLevels.length + 1)
      result = Math.floor(result)
      setPorcentaje(result)
    }
  }, [progress])

  useEffect(() => {
    if (allLevels && progress) {
      const hola = []
      const myCompletedLevels = progress.levelsCompleted
      for (let i = 0; i < myCompletedLevels.length; i++) {
        for (let j = 0; j < allLevels.length; j++) {
          if (myCompletedLevels[i]._id === allLevels[j]._id) hola.push(allLevels[j])
        }
      }
      setCompleted(hola)
    }
  }, [allLevels, progress])

  return (
    <div className="grid grid-cols-2 bg-blue-50 min-h-screen gap-8 p-12">
      {/* Lado izquierdo */}
      <div className="relative bg-blue-100/80 rounded-3xl shadow-xl flex flex-col items-center justify-center p-12">
        <button
          className="text-blue-600 absolute top-10 left-10 px-8 py-4 rounded-full border border-gray-400 text-2xl font-bold hover:bg-blue-200 transition"
          onClick={() => navigate("/MainMenu")}
        >
          ← Volver
        </button>

        <div className="flex flex-col items-center">
          {/* IMPORTANTE: no se deforma gracias a w-auto + object-contain */}
          <img
            className="h-[650px] w-auto object-contain mb-10 drop-shadow-lg"
            src="../../upload/explorador.png"
            alt="explorador.png"
          />
          <h2 className="text-6xl font-sigmar text-blue-600 drop-shadow-md text-center">
            Este es tu progreso {user.username}
          </h2>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="grid grid-rows-2 gap-10">
        {/* Progreso general */}
        <div className="flex flex-col justify-center bg-blue-100/90 rounded-3xl p-12 shadow-lg border-2 border-blue-500">
          <h2 className="text-5xl font-sigmar mb-10 text-blue-600 drop-shadow">
            Progreso General:
          </h2>

          <div className="h-32 bg-blue-500/40 rounded-full overflow-hidden relative border-4 border-blue-600 shadow-inner">
            <div
              className="h-full bg-blue-600 rounded-full transition-[width] duration-300"
              style={{ width: `${porcentaje}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-5xl drop-shadow">
                {porcentaje}%
              </span>
            </div>
          </div>
        </div>

        {/* Países completados */}
        <div className="flex flex-col bg-blue-100/90 rounded-3xl p-12 shadow-lg border-2 border-blue-400">
          <h2 className="text-5xl font-sigmar mb-10 text-blue-600 drop-shadow">
            Países que has completado:
          </h2>

          <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-8 p-2">
            {completed.map((flag, index) => (
              <img
                key={index}
                src={`${MEDIA_BASE}/${flag.flag}`}
                alt="Bandera"
                className="rounded-2xl shadow-lg border-2 border-gray-200 hover:scale-110 transition-transform h-52 w-auto object-contain mx-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
