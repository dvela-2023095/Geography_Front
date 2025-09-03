import { useCallback, useState } from "react"
import { getProgressByUser, updateProgressRequest } from "../../../services/ProgressApi"
import toast from "react-hot-toast"
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

  
  const updateProgress =async(level)=>{
    setLoading(true)
    const body = {
      levelCompleted:level
    }

    const response = await updateProgressRequest(body)
    setLoading(false)
    if(response.error){
      return toast.error(
          response?.e?.response?.data?.message ||
          'Error al actualizar el progreso'
      )
    }
  }

  return { loading, error, progress, loadProgress,updateProgress }
}
