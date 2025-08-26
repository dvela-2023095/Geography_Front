import React, { useState } from "react";
import { validatePassword, validateUsername } from "../../../shared/validators/validators";
import { Input } from "../Input";
import { useLogin } from "../../../shared/hooks/Auth/useLogin";
import { useNavigate } from "react-router-dom";
import '../../../services/tail.css'
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-white to-green-100">
  
            {/* Título arriba */}
            <div className="text-sky-500 font-sigmar text-6xl mb-10 text-center">
                Explora planeta
            </div>

            {/* Contenedor del login */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-sky-100">
                <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
                Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-5 text-wrap">
                <Input
                    field="username"
                    label="username"
                    value={formData.username.value}
                    onChangeHandler={onValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.username.showError}
                    validationMessage="El usuario solo debe tener de 3 a 10 caracteres"
                    style='border-2 border-radius rounded-xl border-gray-300 focus:border-sky-600 w-full focus:outline-none'
                />

                <Input
                    field="password"
                    label="password"
                    value={formData.password.value}
                    onChangeHandler={onValueChange}
                    type="password"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.password.showError}
                    validationMessage="La contraseña debe tener de 8 a 12 caracteres"
                    style='border-2 border-radius rounded-xl border-gray-300 focus:border-sky-600 w-full focus:outline-none'
                />

                <button
                    type="submit"
                    disabled={isSubmitButtonDisable}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-500 to-green-400 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Iniciar Sesión
                </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                ¿Sin cuenta?
                <a
                    onClick={() => switchAuthHandler()}
                    className="ml-1 text-sky-600 font-medium hover:text-green-500 cursor-pointer"
                >
                    Registrate
                </a>
                </p>
            </div>
            </div>


    )
}