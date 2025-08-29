import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { Question } from "../../components/Questions/Question"
import { useQuestions } from "../../../shared/hooks/Questions/useQuestion"
import { AnswerCard } from "./AnswerdCard"
import { useNavigate } from "react-router-dom"

export const QuestionsPage =()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const {level}=location.state
    const {getQuestions,questions}=useQuestions()
    const [questionNumber,setQuestionNumber]=useState(0)
    const [lifes,setLifes]=useState([
        {id: 1,show:true,src:'../../upload/corazon.gif'},
        {id: 2,show:true,src:'../../upload/corazon.gif'},
        {id: 3,show:true,src:'../../upload/corazon.gif'}])
    const [lifesNumber,setLifesNumber]=useState(3)
    useEffect(()=>{
        getQuestions(level.id)
    },[])
    
    const handleNextQuestion =()=>{
        if(questionNumber ===9){
            console.log('hola jijiji');
            
        }else{
            setQuestionNumber(prev=>prev+1)
        }
    }

    const handleLifesNumber =()=>{
        if(lifesNumber>1){
            setLifes(prev=>
                prev.map(life=> life.id === lifesNumber ? {...life,show:false}:life)
            )
            setLifesNumber(prev => prev-1)
        }else{
            navigate('/niveles/list')
        }
    }
    return(
        <>
            <div className="min-h-screen bg-gradient-to-b from-blue-200 via-white to-green-200 flex flex-col items-center p-6">
                
                <div className="w-full max-w-xl mb-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                    {questions.length > 0 && (
                    <Question
                        imgUrl={level.imageUrl}
                        Question={questions[questionNumber].question}
                    />
                    )}
                </div>

                
                <div className="w-full max-w-l flex justify-between space-x-4">
                    {questions.length > 0 &&
                    questions[questionNumber].opciones.map((opcion, index) => (
                        <AnswerCard
                        key={index}
                        answer={opcion.answer}
                        picture={opcion.picture}
                        isCorrect={opcion.isCorrect}
                        nextQuestionHandler={ handleNextQuestion }
                        lifeHandler={handleLifesNumber}
                        />
                    ))}
                </div>
                <div className="flex w-20 h-20 items-center space-x-3 mb-6">
                    {lifes.map((life,index)=>(
                        life.show && <img src={life.src} key={index}></img>
                    ))}
                </div>
                </div>
                
        </>
    )
}