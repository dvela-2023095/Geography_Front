import { useNavigate } from "react-router-dom";
import { buttonTransition, exploraPlanetaTransition, imgTransition } from "../transitions";

export const MainMenuPage = () => {
  const usuario = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 md:px-12">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className={exploraPlanetaTransition} style={{color:"#2f98bc"}}>
            EXPLORA <br /> PLANETA
          </h1>

          {usuario && (
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl text-gray-600 text-center animate-typing">
              Bienvenido, {usuario.username}
            </p>
          )}

          <div className="mt-10 w-full flex flex-col gap-6 items-center">
            <button
              onClick={() => navigate("/niveles/list")}       // ⬅️ aquí
              className={buttonTransition}
            >
              Start
            </button>

            <button className={buttonTransition}

              onClick={()=>navigate('/progress')}>
              Progreso
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/upload/menuPrincipal.jpeg"
            className={imgTransition}
          />
        </div>
      </div>
    </div>
  )
}
