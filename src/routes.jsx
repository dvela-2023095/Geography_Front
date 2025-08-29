import { AuthPage } from "./pages/AuthPage"
import { MainMenuPage } from "./pages/MainMenuPage"
import { LevelsList } from "./pages/Levels/LevelList"

export const routes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/MainMenu",
    element: <MainMenuPage />,
  },
  { 
    path: "/niveles/list", element: <LevelsList /> 
  }
]
