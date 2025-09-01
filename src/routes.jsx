import { AuthPage } from "./pages/AuthPage"
import { MainMenuPage } from "./pages/MainMenuPage"
import { LevelsList } from "./pages/Levels/LevelList"
import { element } from "prop-types"
import { QuestionsPage } from "./pages/Questions/QuestionsPage"

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
  },
  {
    path: '/question',element:<QuestionsPage/>
  }
]
