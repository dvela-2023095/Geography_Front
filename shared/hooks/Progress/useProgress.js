import { useCallback, useState } from "react"
import { getProgressByUser } from "../../../services/ProgressApi"

export const useUserProgress = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(null)

  const loadProgress = useCallback(async (userId) => {
    setLoading(true)
    setError("")
    const res = await getProgressByUser(userId)
    if (res?.error || !res?.progress) {
      setError(res?.message || "Error cargando progreso")
      setProgress(null)
    } else {
      setProgress(res.progress)
    }
    setLoading(false)
  }, [])

  return { loading, error, progress, loadProgress }
}
