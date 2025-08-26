import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, registerRequest } from "../../../services/Authapi";
import toast from "react-hot-toast";

export const useLogin = ()=>{
    const [isLoading, setIsLoading]= useState(false)
    const navigate = useNavigate()

    const login = async(userLogin,password)=>{
        setIsLoading(true)
        const user = {
            userLogin,
            password
        }
        const response = await loginRequest(user)
        setIsLoading(false)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message ||
                'Error al iniciar sesion intentalo de nuevo'
            )
        }
        localStorage.setItem('user',JSON.stringify(response?.data?.loggedUser))
        localStorage.setItem('token',response?.data?.token)
        navigate('/MainMenu')
    }

    const register =async(username,password)=>{
        setIsLoading(true)
        const user = {
            username,
            password
        }
        const response = await registerRequest(user)
        setIsLoading(false)
        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message ||
                'Error al registrar el usuario, intentelo de nuevo'
            )
        }
        navigate('/')
    }

    return {
        login,
        isLoading,
        register
    }
}

