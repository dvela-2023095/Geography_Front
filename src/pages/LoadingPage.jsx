import { Bouncy } from "ldrs/react"
import 'ldrs/react/Bouncy.css'

export const LoadingPage = () => {
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center 
                 bg-radial from-white-400 from-40% to-sky-700  z-50"
    >
      
      <img 
        src="../../upload/seal-travel.gif" 
        alt="Cargando..." 
        className="w-48 h-48 sm:w-64 sm:h-64 mb-6"
      />

      
      <Bouncy
        size="45"
        speed="1.75"
        color="black"
      />
    </div>
  )
}
