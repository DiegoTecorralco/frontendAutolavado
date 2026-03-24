import type { ReactNode } from 'react'
import './Card.css'

interface CardProps {
    children: ReactNode
    title?: string
    className?: string
    onClick?: () => void
}

const Card = ({ children, title, className = '', onClick }: CardProps) => {
    return (
        <div className={`card ${className} ${onClick ? 'card-clickable' : ''}`} onClick={onClick}>
            {title && <div className="card-title">{title}</div>}
            <div className="card-content">{children}</div>
        </div>
    )
}

export default Card