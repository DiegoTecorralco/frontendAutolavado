import type { ChangeEvent } from 'react'
import './Input.css'

interface InputProps {
    label?: string
    type?: 'text' | 'password' | 'email' | 'number'
    name: string
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    error?: string
}

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error = ''
}: InputProps) => {
    return (
        <div className="input-container">
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`input-field ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default Input