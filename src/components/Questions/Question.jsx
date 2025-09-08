

export const Question = ({ imgUrl, Question }) => {
    return (
        <div className="flex w-full items-center gap-4 sm:gap-6 md:gap-8">
            <img src={imgUrl} alt="Bandera" className="w-1/3 h-auto object-contain" />
            <p className="w-2/3 text-lg sm:text-xl md:text-2xl font-semibold animate-typing">{Question}</p>
        </div>
    )
}