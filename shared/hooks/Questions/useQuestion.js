import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionsRequest } from "../../../services/Questionsapi";
import toast from "react-hot-toast";


export const useQuestions =()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [questions, setQuestions]=useState([])
    const navigate = useNavigate()

    const getQuestions = async(id)=>{
        setIsLoading(true)
        const response = await getQuestionsRequest(id)
        setIsLoading(false)

        if(response.error){
            return toast.error(
                response?.e?.response?.data?.message ||
                'Error al iniciar sesion intentalo de nuevo'
            )
        }

        setQuestions(response.data.message)
        toast.success('Preguntas cargadas exitosamente')
    }

    return {
        getQuestions,
        isLoading,
        questions
    }
}