import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Question } from "../../components/Questions/Question"
import { useQuestions } from "../../../shared/hooks/Questions/useQuestion"
import { AnswerCard } from "./AnswerdCard"
import { ResultModal } from "../Result/ResultModal"
import { useUserProgress } from "../../../shared/hooks/Progress/useProgress"

export const QuestionsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { level } = location.state
    const { getQuestions, questions } = useQuestions()
    const [answers, setAnswers] =useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [result, setResult] = useState(null)
    const {updateProgress}=useUserProgress()
    const user = JSON.parse(localStorage.getItem('user'))

    const DEFAULT_CLASS = 'cursor-pointer flex flex-col items-center justify-center p-4  rounded-2xl shadow-lg hover:shadow-2xl transition-all w-96'
    const DEFAULT_TEXT = 'text-center text-xl font-bold'

    const [lifes, setLifes] = useState([
        { id: 1, show: true, src: '../../upload/corazon.gif' },
        { id: 2, show: true, src: '../../upload/corazon.gif' },
        { id: 3, show: true, src: '../../upload/corazon.gif' }
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
        if (percent >= 100) {
            unlockAndShowWin()
        }
        else setResult('lose')
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
        { id: 1, show: true, src: '../../upload/corazon.gif' },
        { id: 2, show: true, src: '../../upload/corazon.gif' },
        { id: 3, show: true, src: '../../upload/corazon.gif' }
        ])
        setLifesNumber(3)
    }

    
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-200 via-white to-green-200 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-8 overflow-hidden">

            {/* vidas */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-1">
            {lifes.map((life, i) => (
                life.show && <img src={life.src} key={i} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
            ))}
            </div>

            {/* pregunta */}
            <div className="w-full max-w-6xl mb-10 md:mb-12 lg:mb-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 lg:py-5 flex justify-center">
                {questions.length > 0 && (
                    <Question
                        imgUrl={level.flagUrl}
                        Question={questions[questionNumber].question}
                    />
                )}
            </div>


            {/* respuestas */}
            <div className="w-full max-w-7xl flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
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
                />
            ))}
            </div>

            {/* progreso */}
            <div className="w-full max-w-4xl mb-6 md:mb-8 lg:mb-7">
            <div className="w-full h-10 sm:h-12 md:h-14 lg:h-12 bg-blue-300/60 rounded-full overflow-hidden relative">
                <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${percent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">{percent}%</span>
                </div>
            </div>
            <p className="text-center text-gray-600 mt-3 sm:mt-2 text-base sm:text-lg md:text-xl">
                Correctas {correctCount} / {total}
            </p>
            </div>

            <ResultModal
            open={!!result}
            type={result || 'lose'}
            onContinue={handleContinue}
            onRetry={handleRetry}
            />
        </div>
    )

}
