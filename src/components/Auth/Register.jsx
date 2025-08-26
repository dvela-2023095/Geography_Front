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
            <div className="min-h-screen max-h-screen flex bg-gradient-to-br from-sky-200 via-white to-green-100">
                {/* Formulario izquierda */}
                <div className="w-3/10 max-w-md bg-white/90 backdrop-blur-md rounded-l-2xl shadow-lg p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Registrate</h2>

                <form onSubmit={handleRegister} className="space-y-5">
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
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-500 to-green-400 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                    Registrar
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    ¿Ya tienes cuenta?
                    <a
                    onClick={() => switchAuthHandler()}
                    className="ml-1 text-sky-600 font-medium hover:text-green-500 cursor-pointer"
                    >
                    Logueate
                    </a>
                </p>
                </div>

                {/* Imagen derecha */}
                <div className="w-7/10 hidden md:flex items-center justify-center bg-gradient-to-tr from-green-200 via-white to-sky-200 rounded-r-2xl">
                <img
                    src='../../../upload/gift-register.gif'
                    alt="Decorative"
                    className="object-cover h-full w-full "
                />
                </div>
            </div>
            </>

    )
}