import { useState, useCallback } from "react"
import { getLevels } from "../../../services/Levelsapi.js"

export const useLevels = () => {
  const [allLevels, setAllLevels] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const getLevelsHook = useCallback(async () => {
    try {
      setLoading(true)
      setErr("")
      const data = await getLevels()
      if (data?.error) {
        setErr("No se pudieron cargar los niveles.")
        setAllLevels([])
      } else {
        setAllLevels(Array.isArray(data) ? data : [])
      }
    } catch (e) {
      setErr("Error cargando niveles.")
      setAllLevels([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { allLevels, getLevels: getLevelsHook, loading, err }
}
