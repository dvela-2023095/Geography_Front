

export const AnswerCard = ({answer,picture,isCorrect,nextQuestionHandler,lifeHandler})=>{
    const UPLOADS_ROUTE = 'http://localhost:2636/uploads/img/questions/'
    const handleAnswer =()=>{
        if(isCorrect === true){
            nextQuestionHandler()
        }else{
            lifeHandler()
        }
    }
    
    return(
        <>
            <div onClick={() => handleAnswer()}
                className="cursor-pointer flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all w-1/3">
                <img
                    src={`${UPLOADS_ROUTE}${picture}`}
                    alt="respuesta"
                    className="w-80 h-40 object-cover mb-2 rounded-lg"
                />
                <p className="text-center text-lg font-semibold text-blue-800">{answer}</p>
                </div>
        </>
    )
}