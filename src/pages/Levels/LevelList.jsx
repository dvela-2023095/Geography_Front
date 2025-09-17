import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevels } from "../../../services/Levelsapi.js"
import { getProgressByUser } from "../../../services/ProgressApi.js"
import { boton_volver } from "../../transitions.js"

const MEDIA_BASE = "http://localhost:2636/uploads/img/levels"

export const LevelsList = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?.uid || user?._id

  const [cards, setCards] = useState([])
  const [progress, setProgress] = useState(null)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [blockedMsg, setBlockedMsg] = useState("")

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErr("")
      try {
        const levelsData = await getLevels()
        if (!levelsData) throw new Error("No se pudieron cargar los niveles")

        const onlyLevelImages = levelsData.map((lv, i) => ({
          id: lv._id,
          name: lv.name || `Nivel ${i + 1}`,
          levelUrl: `${MEDIA_BASE}/${lv.levelImage}`,
          flagUrl: `${MEDIA_BASE}/${lv.flag}`,
          order: i + 1,
        }))
        setCards(onlyLevelImages)

        if (userId) {
          const progressData = await getProgressByUser(userId)

          if (progressData?.success && progressData.progress) {
            setProgress(progressData.progress)

            const unblockedIdx = onlyLevelImages.findIndex(
              lv => lv.id === progressData.progress.unblockedLevel
            )
            setIndex(unblockedIdx !== -1 ? unblockedIdx : 0)
          } else {
            setProgress(null)
            setIndex(0)
          }
        } else {
          setErr("Usuario no encontrado")
        }
      } catch (e) {
        console.error(e)
        setErr("Error al cargar los niveles o progreso")
      }
      setLoading(false)
    }

    load()
  }, [userId])

  const clamp = n => (cards.length ? (n + cards.length) % cards.length : 0)
  const goPrev = () => setIndex(i => clamp(i - 1))
  const goNext = () => setIndex(i => clamp(i + 1))

  if (loading) return <p className="text-3xl">Cargando…</p>
  if (err || !cards.length) return <p className="text-3xl">{err || "No hay niveles"}</p>

  const center = cards[index]
  const left = cards[clamp(index - 1)]
  const right = cards[clamp(index + 1)]

  const isUnlocked = (lv, idx) => {
    if (!lv) return false
    if (!progress) return idx === 0
    if (progress.levelsCompleted.some(l => l._id === lv.id)) return true
    if (lv.id === progress.unblockedLevel) return true
    return false
  }

  const leftUnlocked = isUnlocked(left, clamp(index - 1))
  const centerUnlocked = isUnlocked(center, index)
  const rightUnlocked = isUnlocked(right, clamp(index + 1))

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={{ background: "#5bb4d6" }}
    >
      <button onClick={() => navigate("/MainMenu")} className={boton_volver}>
        ← Volver
      </button>

      <div className="w-full max-w-[1400px] flex items-center justify-center gap-12">
        <div className="flex flex-col items-center">
          <div
            className="w-80 h-56 md:w-[22rem] md:h-[15rem] rounded-2xl shadow-xl overflow-hidden bg-white relative"
            style={{
              filter: leftUnlocked ? "none" : "grayscale(80%) brightness(0.85)",
            }}
          >
            <img src={left.levelUrl} alt="" className="w-full h-full object-cover animate-fadeIn" />
            {!leftUnlocked && <div className="absolute inset-0 flex items-center justify-center text-6xl">🔒</div>}
          </div>
        </div>

        <button onClick={goPrev} className="text-6xl px-4 animate-bounce">«</button>

        <div className="flex flex-col items-center">
          <div className="relative w-[40rem] h-[25rem] rounded-3xl shadow-2xl overflow-hidden bg-white">
            <img src={center.levelUrl} alt="" className="w-full h-full object-cover animate-fadeIn" />
            {!centerUnlocked && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 text-white">
                <span className="text-7xl">🔒</span>
                <p className="text-2xl font-semibold">Completa el nivel anterior para desbloquear</p>
              </div>
            )}
          </div>
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
              centerUnlocked ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Jugar
          </button>
          {blockedMsg && <p className="mt-4 text-red-600 text-lg font-semibold">{blockedMsg}</p>}
        </div>

        <button onClick={goNext} className="text-6xl px-4 animate-bounce">»</button>
        <div className="flex flex-col items-center">
          <div
            className="w-80 h-56 md:w-[22rem] md:h-[15rem] rounded-2xl shadow-xl overflow-hidden bg-white relative"
            style={{
              filter: rightUnlocked ? "none" : "grayscale(80%) brightness(0.85)",
            }}
          >
            <img src={right.levelUrl} alt="" className="w-full h-full object-cover animate-fadeIn" />
            {!rightUnlocked && <div className="absolute inset-0 flex items-center justify-center text-6xl">🔒</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
