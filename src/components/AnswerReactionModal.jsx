export const  AnswerReactionModal =({ open, message,typeAnswer }) =>{
  
    const randnum = Math.floor(Math.random()*6)+1

  return (
    <>
        {
            open ? 
            (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

                    <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center flex flex-col items-center">
                        <h2 className="text-5xl font-sigmar text-blue-600 drop-shadow-md text-center mb-5">{message}</h2>
                        <img className="max-h-[500px] max-w-[500px] " src={`../upload/${typeAnswer}${randnum}.gif`} alt="" />
                    </div>
                </div>
            ):null
        }
    </>
  )
}
