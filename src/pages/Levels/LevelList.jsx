import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevels } from "../../../services/Levelsapi.js"
import { boton_volver } from "../../transitions.js"

const MEDIA_BASE = "http://localhost:2636/uploads/img/levels"

export const LevelsList = () => {
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [blockedMsg, setBlockedMsg] = useState("")  // 👈 estado para mostrar mensaje
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErr("")
      const data = await getLevels()
      if (data?.error) {
        setErr("No se pudieron cargar los niveles")
        setCards([])
      } else {
        const onlyLevelImages = []
        for (let i = 0; i < (Array.isArray(data) ? data.length : 0); i++) {
          const lv = data[i]
          if (lv?.levelImage) {
            onlyLevelImages.push({
              id: lv._id || lv.id,
              name: lv.name || `Nivel ${i + 1}`,
              levelUrl: `${MEDIA_BASE}/${lv.levelImage}`,
              flagUrl: `${MEDIA_BASE}/${lv.flag}`,
              order: i + 1,
            })
          }
        }
        setCards(onlyLevelImages)
        if (!onlyLevelImages.length) setErr("No hay niveles disponibles")
      }
      setLoading(false)
    }
    load()
  }, [])

  const clamp = n => (cards.length ? (n + cards.length) % cards.length : 0)
  const goPrev = () => setIndex(i => clamp(i - 1))
  const goNext = () => setIndex(i => clamp(i + 1))

  if (loading) return <p className="text-3xl">Cargando…</p>
  if (err || !cards.length) return <p className="text-3xl">{err || "No hay niveles"}</p>

  const center = cards[index]
  const left = cards[clamp(index - 1)]
  const right = cards[clamp(index + 1)]

  const completed = JSON.parse(localStorage.getItem("completedLevels") || "[]")

  const isUnlocked = lv => {
    if (!lv) return false
    if (completed.includes(lv.id)) return true
    if (lv.order === 1) return true
    const prev = cards.find(f => f.order === lv.order - 1)
    return prev ? completed.includes(prev.id) : false
  }

  const leftUnlocked = isUnlocked(left)
  const centerUnlocked = isUnlocked(center)
  const rightUnlocked = isUnlocked(right)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <button
        onClick={() => navigate("/MainMenu")}
        className={boton_volver}>
          ← Volver
      </button>

      <div className="w-full max-w-[1400px] flex items-center justify-center gap-12">
        <div className="flex flex-col items-center">
          <div
            className="w-80 h-56 md:w-[22rem] md:h-[15rem] rounded-2xl shadow-xl overflow-hidden bg-white relative"
            style={{ filter: leftUnlocked ? "none" : "grayscale(80%) brightness(0.85)" }}
          >
            <img src={left.levelUrl} alt={left.name} className="w-full h-full object-cover animate-fadeIn" />
            {!leftUnlocked && <div className="absolute inset-0 flex items-center justify-center text-6xl">🔒</div>}
          </div>
          <p className="mt-3 text-xl">{left?.name}</p>
        </div>

        <button onClick={goPrev} className="text-6xl px-4 animate-bounce">«</button>

        <div className="flex flex-col items-center">
          <div className="relative w-[40rem] h-[25rem] rounded-3xl shadow-2xl overflow-hidden bg-white">
            <img src={center.levelUrl} alt={center.name} className="w-full h-full object-cover animate-fadeIn" />
            {!centerUnlocked && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 text-white">
                <span className="text-7xl">🔒</span>
                <p className="text-2xl font-semibold">Completa el nivel anterior para desbloquear</p>
              </div>
            )}
          </div>
          <p className="mt-6 text-4xl font-extrabold animate-typing">{center.name}</p>
          <button
            onClick={() => {
              if (!centerUnlocked) {
                setBlockedMsg("⚠️ Debes pasarte el nivel anterior para poder jugar")
                return
              }
              setBlockedMsg("")
              navigate(`/question`, { state: { level: center } })
            }}
            className={`mt-4 px-12 py-5 rounded-full text-2xl font-bold animate-upSlide ${
              centerUnlocked
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Jugar
          </button>

          {blockedMsg && (
            <p className="mt-4 text-red-600 text-lg font-semibold">{blockedMsg}</p>
          )}
        </div>

        <button onClick={goNext} className="text-6xl px-4 animate-bounce">»</button>

        <div className="flex flex-col items-center">
          <div
            className="w-80 h-56 md:w-[22rem] md:h-[15rem] rounded-2xl shadow-xl overflow-hidden bg-white relative"
            style={{ filter: rightUnlocked ? "none" : "grayscale(80%) brightness(0.85)" }}
          >
            <img src={right.levelUrl} alt={right.name} className="w-full h-full object-cover animate-fadeIn" />
            {!rightUnlocked && <div className="absolute inset-0 flex items-center justify-center text-6xl">🔒</div>}
          </div>
          <p className="mt-3 text-xl">{right?.name}</p>
        </div>
      </div>
    </div>
  )
}
