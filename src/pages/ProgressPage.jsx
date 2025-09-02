
import { useNavigate } from "react-router-dom"
import { useUserProgress } from "../../shared/hooks/Progress/useProgress"
import { useEffect, useState } from "react"
import { useLevels } from "../../shared/hooks/Levels/useLevels"

export const ProgressPage =()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [porcentaje,setPorcentaje]=useState(20)
    const [completed,setCompleted]=useState([])
    const {progress,loadProgress}=useUserProgress()
    const {getLevels,allLevels}=useLevels()
    const MEDIA_BASE = "http://localhost:2636/uploads/img/levels"
    useEffect(()=>{
        loadProgress(user.uid)
        getLevels()
    },[])

    useEffect(()=>{
        if(progress){
            let result = (100*progress.levelsCompleted.length) / (progress.blockedLevels.length +1)
            result = Math.floor(result)
            setPorcentaje(result)
        }
        
    },[progress])

    useEffect(()=>{
        if(allLevels && progress){
            let hola=[]
            let myCompletedLevels = progress.levelsCompleted
            for(let i= 0;i <progress.levelsCompleted.length;i++){
                for(let j=0;j<allLevels.length;j++){
                    if(myCompletedLevels[i]._id=== allLevels[j]._id) hola.push(allLevels[j])
                }
            }
            setCompleted(hola)
            
        }
        
    },[allLevels])

    return(
        <div className="grid grid-cols-2  bg-blue-50 min-h-screen  gap-2"> 
            {/* Lado izquierdo */}
            <div className="relative bg-blue-100/80 rounded-2xl shadow-md  ">
                <button className="text-blue-500 absolute top-6 left-6 px-6 py-3 rounded-full border border-gray-400 text-xl font-bold hover:bg-blue-200 transition-colors"
                    onClick={()=>navigate('/MainMenu')}>
                    ← Volver
                </button>
                <div className="flex items-center flex-col">
                    <img className="max-h-150 w-full rounded-xl" 
                        src="../../upload/explorador.png" alt="explorador.png" />
                    <h2 className="text-4xl font-sigmar mb-7 text-blue-500 drop-shadow-md">
                        Este es tu progreso {user.username}
                    </h2>
                </div>
            </div>

            {/* Lado derecho */}
            <div className="grid grid-rows-2 gap-6">
                {/* Progreso general */}
                <div className="grid grid-rows-3 items-center bg-blue-100/80 rounded-2xl p-6 shadow-inner border border-blue-500">
                    <h2 className="text-4xl font-sigmar mb-7 text-blue-500 drop-shadow-sm">
                        Progreso General:
                    </h2>
                    <div className="mr-3 ml-3 h-20 row-span-2 bg-blue-500/40 rounded-full overflow-hidden relative border-2 border-blue-500 shadow-inner">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${porcentaje}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow">
                                {porcentaje}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Países completados */}
                <div className="grid grid-rows-3 bg-blue-100/70 rounded-2xl p-6 shadow-inner border border-blue-300">
                    <h2 className="text-4xl font-sigmar mb-7 text-blue-500 drop-shadow-sm">
                        Países que Haz Completado:
                    </h2>
                    <div className="row-span-2 overflow-y-auto grid grid-cols-3 grid-row-auto gap-4 p-3 mr-3">
                        {
                            completed && completed.map((flag,index)=>(
                                <img key={index} src={`${MEDIA_BASE}/${flag.flag}`} 
                                    alt="Bandera"
                                    className="rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform"/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}