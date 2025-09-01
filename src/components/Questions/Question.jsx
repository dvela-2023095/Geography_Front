
export const Question = ({imgUrl,Question})=>{

    return(
        <div>
            <img src={imgUrl} alt="Bandera" />
            <p>{Question}</p>
        </div>
    )
}