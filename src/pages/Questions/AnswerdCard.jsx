export const AnswerCard = ({ answer, picture, isCorrect, nextQuestionHandler, lifeHandler, onCorrect }) => {
  const UPLOADS_ROUTE = 'http://localhost:2636/uploads/img/questions/'

  const handleAnswer = () => {
    if (isCorrect === true) {
      if (onCorrect) onCorrect()
      nextQuestionHandler()
    } else {
      lifeHandler()
    }
  }

  return (
    <div
      onClick={handleAnswer}
      className="cursor-pointer flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all w-96"
    >
      <img
        src={`${UPLOADS_ROUTE}${picture}`}
        alt="respuesta"
        className="w-80 h-52 object-cover mb-3 rounded-lg"
      />
      <p className="text-center text-xl font-bold text-blue-800">{answer}</p>
    </div>
  )
}
