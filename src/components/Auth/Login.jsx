import React, { useState } from "react";
import { validatePassword, validateUsername } from "../../../shared/validators/validators";
import { Input } from "../Input";
import { useLogin } from "../../../shared/hooks/Auth/useLogin";
import { useNavigate } from "react-router-dom";
export const Login = ({switchAuthHandler})=>{
    const navigate = useNavigate()
    const {login}= useLogin()
    const [formData, setFormData]= useState({
        username:{value:'',isValid:false,showError:false},
        password:{value:'',isValid:false,showError:false}
    })

    const isSubmitButtonDisable = !formData.username.isValid || !formData.password.isValid

    const onValueChange = (value, field)=>{
        setFormData(prevData =>({
            ...prevData,
            [field]:{...prevData[field],value}
        }))
    }

    const handleValidationOnBlur = (value, field)=>{
        let isValid = false
        switch (field) {
            case 'username':
                isValid = validateUsername(value)
                break;
            case 'password':
                isValid = validatePassword(value)
                break;
        }
        setFormData(prevData =>({
            ...prevData,
            [field]:{...prevData[field],isValid,showError:!isValid}
        }))
    }


    const handleLogin =(e)=>{
        e.preventDefault()
        login(formData.username.value,formData.password.value)
        
    }

    return(
        <>
            <h2>Login</h2>
            <div>
                <form onSubmit={handleLogin}>
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

                    <button type="submit" disabled={isSubmitButtonDisable}>
                     Iniciar Sesión
                    </button>
                </form>

                <p>¿Sin cuenta?<a onClick={()=>switchAuthHandler()}>Registrate</a></p>
            </div>
        </>
    )
}