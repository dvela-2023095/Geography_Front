import { useEffect, useState } from "react"

export const AnswerCard = ({ answer, 
  picture, 
  isCorrect, 
  nextQuestionHandler, 
  lifeHandler, 
  onCorrect, 
  cardColor,
  textColor,
  change,
  good,
  bad }) => {
  const UPLOADS_ROUTE = 'http://localhost:2636/uploads/img/questions/'
  
  const [cardClass, setCardClass]=useState((`${cardColor} bg-white`))
  const [txtColor,setTxtColor]=useState((`${textColor} text-blue-800`))

  useEffect(()=>{
    setCardClass(`${cardColor} bg-white`)
    setTxtColor(`${textColor} text-blue-800`)
  },[change])


  const handleAnswer = async() => {
    if (isCorrect === true) {
      if (onCorrect) onCorrect()
        await good(),
        nextQuestionHandler()
    } else {
      answerColorHandler()
      await bad()
      lifeHandler()
    }
  }

  const answerColorHandler =()=>{
    setCardClass(`${cardColor} bg-red-600`)
    setTxtColor(`${textColor} text-white`)
  }

  return (
    <div
      onClick={handleAnswer}
      className={`animate-downSlide  ${cardClass}`}
    >
      <img
        src={`${UPLOADS_ROUTE}${picture}`}
        alt="respuesta"
        className="w-80 h-52 object-cover mb-3 rounded-lg"
      />
      <p className={`animate-typing ${txtColor}`}>{answer}</p>
    </div>
  )
}
