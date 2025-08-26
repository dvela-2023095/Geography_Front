import PropTypes from "prop-types"
import React from "react"

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    type,
    placeholder,
    textarea,
    style
})=>{
    const handleValueChange=(e)=>{
        const val = type ==='file' ? e.target.files[0]: e.target.value
        onChangeHandler(val,field)
    }

    const handleOnBlur=(e)=>{
        const val = type === 'file' ? e.target.files[0]: e.target.value
        onBlurHandler(val,field)
    }

    return(
        <>
            <div>
                <span>{label}</span>
            </div>
            {
                textarea ? (
                    <textarea
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleOnBlur}
                        rows={5}
                        placeholder={placeholder}
                        className={style}
                    />
                ):(
                    <input type={type}
                        value={type === 'file' ? undefined:value}
                        onChange={handleValueChange}
                        onBlur={handleOnBlur}
                        placeholder={placeholder}
                        className={style}
                     />
                )
            }
            <span className="text-red-600">{showErrorMessage && validationMessage }</span>
        </>
    )
}
Input.prototypes ={
        field:PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        onChangeHandler: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        showErrorMessage: PropTypes.bool.isRequired,
        validationMessage: PropTypes.string,
        onBlurHandler: PropTypes.func.isRequired,
        textarea: PropTypes.bool
    }