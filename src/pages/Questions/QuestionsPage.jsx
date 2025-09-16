import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Question } from "../../components/Questions/Question"
import { useQuestions } from "../../../shared/hooks/Questions/useQuestion"
import { AnswerCard } from "./AnswerdCard"
import { ResultModal } from "../Result/ResultModal"
import { useUserProgress } from "../../../shared/hooks/Progress/useProgress"
import { LoadingPage } from "../LoadingPage"
import { AnswerReactionModal } from "../../components/AnswerReactionModal"
import { answers_container, question_container } from "../../transitions"

export const QuestionsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { level } = location.state
    const { getQuestions, questions,isLoading } = useQuestions()
    const [answers, setAnswers] =useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [result, setResult] = useState(null)
    const {updateProgress}=useUserProgress()
    const [show, setShow] = useState(false)
    const [typeOfAnswer,setTypeOfAnswer]=useState({message:'Hola!!!',typeAnswer:'good'})
    const user = JSON.parse(localStorage.getItem('user'))

    const DEFAULT_CLASS = 'sm:max-h-70 cursor-pointer flex flex-col items-center justify-center p-4  rounded-2xl shadow-lg hover:shadow-2xl transition-all w-96'
    const DEFAULT_TEXT = 'text-center text-xl font-bold'

    const [lifes, setLifes] = useState([
        { id: 1, show: true, src: level.flagUrl },
        { id: 2, show: true, src: level.flagUrl },
        { id: 3, show: true, src: level.flagUrl }
    ])
    const [lifesNumber, setLifesNumber] = useState(3)

    useEffect(() => {
        getQuestions(level.id)
    }, [])
    
    useEffect(() => {
        if (questions.length > 0) {
            let opciones = [...questions[questionNumber].opciones]
            for (let i = opciones.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[opciones[i], opciones[j]] = [opciones[j], opciones[i]]
            }

            setAnswers(opciones) 
        }
    }, [questions, questionNumber])


    
    const total = questions.length || 0
    const percent = total ? Math.round((correctCount / total) * 100) : 0

    const unlockAndShowWin = () => {
        const done = JSON.parse(localStorage.getItem('completedLevels') || '[]')
        if (!done.includes(level.id)) {
        done.push(level.id)
        localStorage.setItem('completedLevels', JSON.stringify(done))
        }
        setResult('win')
    }

    const handleNextQuestion = () => {
        const lastIndex = (questions.length || 1) - 1
        if (questionNumber >= lastIndex) {
            updateProgress(level.id)
        } else {
        setQuestionNumber(prev => prev + 1)
        }

    }

    const handleCorrect = () => {
        setCorrectCount(prev => {
        const next = prev + 1
        const nextPercent = Math.round((next / (questions.length || 1)) * 100)
        if (nextPercent >= 100) {
            unlockAndShowWin()
            return next
        }
        return next
        })
    }

    const handleLifesNumber = () => {
        if (lifesNumber > 1) {
        setLifes(prev => prev.map(life => life.id === lifesNumber ? { ...life, show: false } : life))
        setLifesNumber(prev => prev - 1)
        } else {
        setResult('lose')
        }
    }

    const handleContinue = () => navigate('/niveles/list')

    const handleRetry = () => {
        setResult(null)
        setQuestionNumber(0)
        setCorrectCount(0)
        setLifes([
        { id: 1, show: true, src: level.flagUrl },
        { id: 2, show: true, src: level.flagUrl },
        { id: 3, show: true, src: level.flagUrl }
        ])
        setLifesNumber(3)
    }

    const showCongratulations = async() => {
        await setTypeOfAnswer({message:'Muy Bien!!!',typeAnswer:'good'})
        setShow(true)
        setTimeout(() => setShow(false), 1500) 
    }

    const showDeception = async() => {
        await setTypeOfAnswer({message:'Ups Respuesta incorrecta!!!',typeAnswer:'bad'})
        setShow(true)
        setTimeout(() => setShow(false), 1500) 
    }

    
    
    return (
        <>
            {isLoading ? (<LoadingPage/>):(
                <div className="sm:flex-col w-full bg-gradient-to-b from-blue-200 via-white to-green-200 flex flex-col items-center px-4  md:px-8 lg:min-h-screen " style={{ background: "#5bb4d6" }}>

                {/* vidas */}
                <div className="flex flex-wrap justify-center mt-4 mb-4">
                {lifes.map((life, i) => (
                    life.show && <img src={life.src} key={i} className="mx-3 pt-6  sm:w-14  sm:h-20  animate-bounce" />
                ))}
                </div>

                {/* pregunta */}
                <div className={question_container}>
                    {questions.length > 0 && (
                        <Question
                            key={questions[questionNumber].question}
                            imgUrl={level.flagUrl}
                            Question={questions[questionNumber].question}
                        />
                    )}
                </div>


                {/* respuestas */}
                <div className={answers_container}
                    key={questionNumber}>
                {answers.length > 0 && answers.map((opcion, i) => (
                    <AnswerCard
                    key={i}
                    answer={opcion.answer}
                    picture={opcion.picture}
                    isCorrect={opcion.isCorrect}
                    onCorrect={handleCorrect}
                    nextQuestionHandler={handleNextQuestion}
                    lifeHandler={handleLifesNumber}
                    cardColor={DEFAULT_CLASS}
                    textColor={DEFAULT_TEXT}
                    change={questionNumber}
                    good={showCongratulations}
                    bad={showDeception}
                    />
                ))}

                {/* progreso */}
                <div className="w-full  max-w-4xl   mb-6 md:mb-8 lg:mb-7">
                <div className="w-full h-10  md:h-14 lg:h-12 bg-white rounded-full  relative">
                    <div
                    className="h-full bg-linear-65 from-blue-900 to-sky-500 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">{percent}%</span>
                    </div>
                </div>
                <p className="text-center text-gray-800 mt-3 text-base sm:text-lg md:text-xl">
                    Correctas {correctCount} / {total}
                </p>
                </div>
                </div>


                <ResultModal
                open={!!result}
                type={result || 'lose'}
                onContinue={handleContinue}
                onRetry={handleRetry}
                />
                <AnswerReactionModal
                    open={show}
                    message={typeOfAnswer.message}
                    typeAnswer={typeOfAnswer.typeAnswer}
                />
            </div>)}
        </>
    )

}
