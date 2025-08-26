export const validateUsername = (input)=>{
    const usernameRegex = /^.{3,10}$/
    return usernameRegex.test(input)
}

export const validatePassword = (input)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
    return passwordRegex.test(input)
}