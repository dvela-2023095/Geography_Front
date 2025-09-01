import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Question } from "../../components/Questions/Question"
import { useQuestions } from "../../../shared/hooks/Questions/useQuestion"
import { AnswerCard } from "./AnswerdCard"
import { ResultModal } from "../Result/ResultModal"

export const QuestionsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { level } = location.state
  const { getQuestions, questions } = useQuestions()

  const [questionNumber, setQuestionNumber] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState(null)

  const [lifes, setLifes] = useState([
    { id: 1, show: true, src: '../../upload/corazon.gif' },
    { id: 2, show: true, src: '../../upload/corazon.gif' },
    { id: 3, show: true, src: '../../upload/corazon.gif' }
  ])
  const [lifesNumber, setLifesNumber] = useState(3)

  useEffect(() => {
    getQuestions(level.id)
  }, [])

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
      console.log('hola jijiji')
      if (percent >= 100) unlockAndShowWin()
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
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-white to-green-200 flex flex-col items-center p-16">

      <div className="flex space-x-8 mb-14">
        {lifes.map((life, i) => (
          life.show && <img src={life.src} key={i} className="w-20 h-20" />
        ))}
      </div>

      <div className="w-full max-w-6xl mb-16 bg-white rounded-3xl shadow-2xl p-14 flex flex-col items-center">
        {questions.length > 0 && (
          <Question
            imgUrl={level.flagUrl}
            Question={questions[questionNumber].question}
          />
        )}
      </div>

      <div className="w-full max-w-7xl flex justify-center gap-12 mb-16">
        {questions.length > 0 && questions[questionNumber].opciones.map((opcion, i) => (
          <AnswerCard
            key={i}
            answer={opcion.answer}
            picture={opcion.picture}
            isCorrect={opcion.isCorrect}
            onCorrect={handleCorrect}
            nextQuestionHandler={handleNextQuestion}
            lifeHandler={handleLifesNumber}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mb-10">
        <div className="w-full h-16 bg-blue-300/60 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">{percent}%</span>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4 text-xl">
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
