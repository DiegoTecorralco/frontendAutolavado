import './StatusBadge.css'

interface StatusBadgeProps {
    status: 'finalizado' | 'en_proceso' | 'pendiente' | 'cancelado'
    children?: React.ReactNode
}

const StatusBadge = ({ status, children }: StatusBadgeProps) => {
    const getStatusClass = () => {
        switch (status) {
            case 'finalizado':
                return 'badge-success'
            case 'en_proceso':
                return 'badge-warning'
            case 'pendiente':
                return 'badge-info'
            case 'cancelado':
                return 'badge-danger'
            default:
                return 'badge-default'
        }
    }

    const getStatusText = () => {
        switch (status) {
            case 'finalizado':
                return 'Finalizado'
            case 'en_proceso':
                return 'En Proceso'
            case 'pendiente':
                return 'Pendiente'
            case 'cancelado':
                return 'Cancelado'
            default:
                return status
        }
    }

    return (
        <span className={`status-badge ${getStatusClass()}`}>
            {children || getStatusText()}
        </span>
    )
}

export default StatusBadge