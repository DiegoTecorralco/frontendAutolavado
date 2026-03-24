import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    fullWidth?: boolean
}

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    fullWidth = false
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button