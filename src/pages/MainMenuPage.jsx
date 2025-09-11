import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonTransition, exploraPlanetaTransition, imgTransition } from "../transitions";

export const MainMenuPage = () => {
  const usuario = JSON.parse(localStorage.getItem("user") || "null")
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const confirmLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 md:px-12">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center  lg:gap-16">
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className={exploraPlanetaTransition} style={{color:"#2f98bc"}}>
            EXPLORA <br /> PLANETA
          </h1>

          {usuario && (
            <p className="mt-3 text-2xl sm:text-3xl md:text-4xl text-gray-600 text-center animate-typing">
              Bienvenido, {usuario.username}
            </p>
          )}

          <div className="mt-5 w-full flex flex-col gap-6 items-center">
            <button
              onClick={() => navigate("/niveles/list")}
              className={buttonTransition}
            >
              Start
            </button>

            <button
              className={buttonTransition}
              onClick={() => navigate("/progress")}
            >
              Progreso
            </button>

            <button
              className={buttonTransition}
              onClick={() => setShowModal(true)}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img src="/upload/menuPrincipal.jpeg" className={imgTransition} />
        </div>
      </div>

      {showModal && (
        <div className="overflow-y-auto  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white rounded-2xl shadow-lg p-8 w-80 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              ¿Estás seguro de que quieres cerrar sesión?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                onClick={confirmLogout}
              >
                Sí, salir
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
