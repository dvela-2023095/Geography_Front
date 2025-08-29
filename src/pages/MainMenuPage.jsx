import { useNavigate } from "react-router-dom";

export const MainMenuPage = () => {
  const usuario = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 md:px-12">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className="font-extrabold leading-tight text-[12vw] sm:text-[10vw] md:text-[6rem] lg:text-[8rem]" style={{color:"#2f98bc"}}>
            EXPLORA <br /> PLANETA
          </h1>

          {usuario && (
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl text-gray-600 text-center">
              Bienvenido, {usuario.username}
            </p>
          )}

          <div className="mt-10 w-full flex flex-col gap-6 items-center">
            <button
              onClick={() => navigate("/niveles/list")}       // ⬅️ aquí
              className="w-full max-w-[28rem] px-12 py-5 text-2xl md:text-3xl bg-blue-300 hover:bg-blue-400 rounded-full font-bold text-black shadow-lg transition"
            >
              Start
            </button>

            <button className="w-full max-w-[28rem] px-12 py-5 text-2xl md:text-3xl bg-blue-200 hover:bg-blue-300 rounded-full font-bold text-black shadow-lg transition">
              Progreso
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/upload/menuPrincipal.jpeg"
            className="rounded-full object-cover shadow-2xl w-[65vw] h-[65vw] sm:w-[60vw] sm:h-[60vw] md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] xl:w-[680px] xl:h-[680px]"
          />
        </div>
      </div>
    </div>
  )
}
