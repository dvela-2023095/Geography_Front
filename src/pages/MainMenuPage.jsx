
export const MainMenuPage = ()=>{
    const usuario = JSON.parse(localStorage.getItem('user'))
    
    return(
        <>
        Holaaaaaaaaa {usuario.username}
        </>
    )
}