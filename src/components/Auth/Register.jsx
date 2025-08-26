import React, { useState } from "react";
import { validatePassword, validateUsername } from "../../../shared/validators/validators";
import { Input } from "../Input";
import { useLogin } from "../../../shared/hooks/Auth/useLogin";
export const Register = ({switchAuthHandler})=>{

    const {register}=useLogin()

    const [formData,setFormData]= useState({
        username:{value:'',isValid:false,showError:false},
        password:{value:'',isValid:false,showError:false}
    })

    const isSubmitButtonDisable = !formData.username.isValid ||
            !formData.password.isValid
    const onValueChange =(value,field)=>{
        setFormData(prevData =>({
            ...prevData,
            [field]:{...prevData[field],value}
        }))
    }

    const handleValidationOnBlur =(value,field)=>{
        let isValid = false
        switch(field){
            case'username':
            isValid = validateUsername(value)
            break;
            case'password':
            isValid = validatePassword(value)
            break;
        }
        setFormData(prevData=>({
            ...prevData,
            [field]:{...prevData[field],isValid,showError:!isValid}
        }))
    }

    const handleRegister =(e)=>{
        e.preventDefault()
        register(formData.username.value,formData.password.value)
        
    }
    return(
        <>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <Input
                    field='username'
                    label='username'
                    value={formData.username.value}
                    onChangeHandler={onValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.username.showError}
                    validationMessage='El usuario solo debe tener de 3 a 10 caracteres'
                />
                <Input
                    field='password'
                    label='password'
                    value={formData.password.value}
                    onChangeHandler={onValueChange}
                    type='password'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.password.showError}
                    validationMessage='La contraseña debe tener de 8 a 12 caracteres'
                />
                
                <button type="submit">Registrar</button>
            </form>
            <p>¿Sin cuenta?<a onClick={()=>switchAuthHandler()}>Registrate</a></p>

        </>
    )
}