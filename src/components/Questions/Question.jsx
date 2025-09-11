

export const Question = ({ imgUrl, Question }) => {
    return (
        <div className="flex w-full items-center gap-4 md:gap-8">
            <img src={imgUrl} alt="Bandera" className="w-auto sm:m-10 h-full sm:rounded-3xl object-contain" />
            <p className="text-wrap w-2/3 text-lg sm:text-xl md:text-2xl font-semibold animate-typing">{Question}</p>
        </div>
    )
}