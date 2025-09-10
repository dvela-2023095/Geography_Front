import { useNavigate } from "react-router-dom"
import { useUserProgress } from "../../shared/hooks/Progress/useProgress"
import { useEffect, useState } from "react"
import { useLevels } from "../../shared/hooks/Levels/useLevels"
import { boton_volver } from "../transitions"

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
    <div className="grid grid-cols-2 bg-blue-50 min-h-screen gap-8 ">
      {/* Lado izquierdo */}
      <div className="max-h-screen relative bg-blue-100/80 rounded-3xl shadow-xl flex flex-col items-center justify-center ">
        <button
          className={boton_volver}
          onClick={() => navigate("/MainMenu")}
        >
          ← Volver
        </button>

        <div className="flex flex-col items-center">
          {/* IMPORTANTE: no se deforma gracias a w-auto + object-contain */}
          <img
            className="max-h-[60vh] w-auto object-contain drop-shadow-lg animate-fadeIn"
            src="../../upload/explorador.png"
            alt="explorador.png"
          />
          <h2 className="text-6xl font-sigmar text-blue-600 drop-shadow-md text-center animate-upSlide">
            Este es tu progreso {user.username}
          </h2>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="grid grid-rows-3 gap-5 max-h-screen">
        {/* Progreso general */}
        <div className="flex flex-col justify-center bg-blue-100/90 rounded-3xl p-5 shadow-lg border-2 border-blue-500">
          <h2 className="text-5xl  font-sigmar mb-10 text-blue-600 drop-shadow animate-typing">
            Progreso General:
          </h2>

          <div className="h-32 xl:h-20 bg-blue-500/40 rounded-full overflow-hidden relative border-4 border-blue-600 shadow-inner animate-fadeIn">
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
        <div className="row-span-2 max-w-screen flex flex-col bg-blue-100/90 rounded-3xl p-12 shadow-lg border-2 border-blue-400">
          <h2 className="text-5xl  font-sigmar mb-10 text-blue-600 drop-shadow ">
            Países que has completado:
          </h2>

          <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-3">
            {completed.map((flag, index) => (
              <img
                key={index}
                src={`${MEDIA_BASE}/${flag.flag}`}
                alt="Bandera"
                className=" mt-7 animate-bounce rounded-2xl shadow-lg  transition-transform  w-auto object-contain mx-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
