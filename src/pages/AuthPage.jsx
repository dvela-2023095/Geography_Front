import React, {useState} from "react"
import { Login } from "../components/Auth/Login"
import { Register } from "../components/Auth/Register"
import '../../services/tail.css'

export const AuthPage = ()=>{
    const [isLogin, setIsLogin]= useState(true)

    const handleAuthPage =()=>{
        setIsLogin(!isLogin)
    }
    return(
        <div>
            {isLogin?(
                <Login switchAuthHandler={handleAuthPage}/>
            ):(
                <Register switchAuthHandler={handleAuthPage}/>
            )}
        </div>
    )
}