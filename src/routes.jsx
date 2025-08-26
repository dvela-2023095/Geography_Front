import { element } from "prop-types"
import { AuthPage } from "./pages/AuthPage"
import { MainMenuPage } from "./pages/MainMenuPage"

export const routes = [
    {
        path:'/',
        element: <AuthPage/>
    },
    {
        path:'/MainMenu',
        element:<MainMenuPage/>
    }
]