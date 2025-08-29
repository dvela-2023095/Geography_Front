import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevels } from "../../../services/Levelsapi.js"

const MEDIA_BASE = "http://localhost:2636/uploads/img/levels"

export const LevelsList = () => {
  const [flags, setFlags] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErr("")
      const data = await getLevels()
      if (data?.error) {
        setErr("No se pudieron cargar los niveles")
        setFlags([])
      } else {
        const justFlags = []
        for (let i = 0; i < (Array.isArray(data) ? data.length : 0); i++) {
          const lv = data[i]
          if (lv?.flag) {
            justFlags.push({
              id: lv._id || lv.id,
              name: lv.name || `Nivel ${i + 1}`,
              imageUrl: `${MEDIA_BASE}/${lv.flag}`,
              order: i + 1,
            })
          }
        }
        setFlags(justFlags)
        if (!justFlags.length) setErr("No hay banderas disponibles")
      }
      setLoading(false)
    }
    load()
  }, [])

  const clamp = (n) => (flags.length ? (n + flags.length) % flags.length : 0)
  const goPrev = () => setIndex((i) => clamp(i - 1))
  const goNext = () => setIndex((i) => clamp(i + 1))

  if (loading) return <p>Cargando…</p>
  if (err || !flags.length) return <p>{err || "No hay banderas"}</p>

  const center = flags[index]
  const left = flags[clamp(index - 1)]
  const right = flags[clamp(index + 1)]

  const completed = JSON.parse(localStorage.getItem("completedLevels") || "[]")

  const isUnlocked = (lv) => {
    if (!lv) return false
    if (completed.includes(lv.id)) return true
    if (lv.order === 1) return true
    const prev = flags.find((f) => f.order === lv.order - 1)
    return prev ? completed.includes(prev.id) : false
  }

  const leftUnlocked = isUnlocked(left)
  const centerUnlocked = isUnlocked(center)
  const rightUnlocked = isUnlocked(right)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-7xl flex items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <div
            className="w-56 h-40 md:w-72 md:h-48 rounded-2xl shadow overflow-hidden bg-white relative"
            style={{ filter: leftUnlocked ? "none" : "grayscale(80%) brightness(0.85)" }}
          >
            <img src={left.imageUrl} alt={left.name} className="w-full h-full object-cover" />
            {!leftUnlocked && <div className="absolute inset-0 flex items-center justify-center text-4xl">🔒</div>}
          </div>
          <p>{left?.name}</p>
        </div>

        <button onClick={goPrev} className="text-5xl">«</button>

        <div className="flex flex-col items-center">
          <div className="relative w-[28rem] h-[18rem] md:w-[42rem] md:h-[26rem] rounded-3xl shadow-2xl overflow-hidden bg-white">
            <img src={center.imageUrl} alt={center.name} className="w-full h-full object-cover" />
            {!centerUnlocked && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 text-white">
                <span className="text-6xl">🔒</span>
                <p className="text-xl">Completa el nivel anterior para desbloquear</p>
              </div>
            )}
          </div>
          <p className="mt-6 text-3xl font-bold">{center.name}</p>
          <button
            onClick={() => {
              if (!centerUnlocked) {
                alert("Este nivel está bloqueado")
                return
              }
              navigate(`/question`, {state:{level:center}})
            }}
            className={`mt-4 px-10 py-4 rounded-full text-xl font-bold ${
              centerUnlocked
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Jugar
          </button>
        </div>

        <button onClick={goNext} className="text-5xl">»</button>

        <div className="flex flex-col items-center">
          <div
            className="w-56 h-40 md:w-72 md:h-48 rounded-2xl shadow overflow-hidden bg-white relative"
            style={{ filter: rightUnlocked ? "none" : "grayscale(80%) brightness(0.85)" }}
          >
            <img src={right.imageUrl} alt={right.name} className="w-full h-full object-cover" />
            {!rightUnlocked && <div className="absolute inset-0 flex items-center justify-center text-4xl">🔒</div>}
          </div>
          <p>{right?.name}</p>
        </div>
      </div>
    </div>
  )
}
