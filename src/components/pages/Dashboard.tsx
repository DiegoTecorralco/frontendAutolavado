import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import './Dashboard.css'

// Datos de ejemplo para últimos servicios
const recentServices = [
    {
        id: 1,
        placa: 'ABC-1234',
        cliente: 'Ricardo Montaner',
        vehiculo: 'Honda Civic',
        servicio: 'Lavado Premium',
        operativo: 'Carlos Gomez',
        estado: 'finalizado',
        fecha: '2024-01-15',
        hora: '10:30 AM'
    },
    {
        id: 2,
        placa: 'XYZ-9876',
        cliente: 'Mariana Esposito',
        vehiculo: 'Toyota Hilux',
        servicio: 'Motor & Chassis',
        operativo: 'Luis Suarez',
        estado: 'en_proceso',
        fecha: '2024-01-15',
        hora: '11:45 AM'
    },
    {
        id: 3,
        placa: 'DEF-4567',
        cliente: 'Pedro Capo',
        vehiculo: 'Mazda 3',
        servicio: 'Lavado Básico',
        operativo: 'Carlos Gomez',
        estado: 'finalizado',
        fecha: '2024-01-14',
        hora: '03:20 PM'
    },
    {
        id: 4,
        placa: 'GHI-0012',
        cliente: 'Elena Rose',
        vehiculo: 'Encaredo',
        servicio: 'Lavado Premium',
        operativo: 'Mario Ruiz',
        estado: 'en_proceso',
        fecha: '2024-01-15',
        hora: '09:15 AM'
    },
    {
        id: 5,
        placa: 'JKL-7890',
        cliente: 'Carlos Rivera',
        vehiculo: 'Nissan Versa',
        servicio: 'Limpieza Tapicería',
        operativo: 'Ana Martinez',
        estado: 'pendiente',
        fecha: '2024-01-15',
        hora: '02:00 PM'
    }
]

// Datos de ejemplo para servicios populares
const popularServices = [
    { nombre: 'Lavado Exterior', porcentaje: 42, color: '#3b82f6', cantidad: 126 },
    { nombre: 'Lavado Premium', porcentaje: 28, color: '#8b5cf6', cantidad: 84 },
    { nombre: 'Limpieza Tapicería', porcentaje: 15, color: '#10b981', cantidad: 45 },
    { nombre: 'Motor & Chassis', porcentaje: 10, color: '#f59e0b', cantidad: 30 },
    { nombre: 'Otros', porcentaje: 5, color: '#6b7280', cantidad: 15 }
]

// Datos de ejemplo para actividad semanal
const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const weeklyActivity = [65, 72, 80, 78, 85, 92, 88]

// Datos de ejemplo para estadísticas rápidas
const statsCards = [
    {
        titulo: 'Servicios Hoy',
        valor: '24',
        cambio: '+12%',
        icono: '🔧',
        color: '#3b82f6'
    },
    {
        titulo: 'Clientes Atendidos',
        valor: '18',
        cambio: '+8%',
        icono: '👥',
        color: '#10b981'
    },
    {
        titulo: 'Ingresos Hoy',
        valor: '$1,250',
        cambio: '+15%',
        icono: '💰',
        color: '#f59e0b'
    },
    {
        titulo: 'Vehículos Lavados',
        valor: '156',
        cambio: '+23%',
        icono: '🚗',
        color: '#8b5cf6'
    }
]

interface DashboardProps {
    onNavigate?: (path: string) => void
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
    const navigate = useNavigate()
    const [selectedService, setSelectedService] = useState<any>(null)
    const [userName, setUserName] = useState('Admin')
    const [currentTime, setCurrentTime] = useState(new Date())

    // Obtener datos del usuario logueado
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            try {
                const userData = JSON.parse(user)
                setUserName(userData.username || 'Admin')
            } catch (error) {
                console.error('Error al parsear usuario:', error)
            }
        }
    }, [])

    // Actualizar hora actual
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const handleRowClick = (row: any) => {
        setSelectedService(row)
        console.log('Servicio seleccionado:', row)
        // Aquí puedes abrir un modal o navegar a detalles del servicio
    }

    const handleViewAllServices = () => {
        if (onNavigate) {
            onNavigate('/servicios')
        } else {
            navigate('/servicios')
        }
    }

    const handleViewAllReports = () => {
        if (onNavigate) {
            onNavigate('/reportes')
        } else {
            navigate('/reportes')
        }
    }

    // Columnas para la tabla de últimos servicios
    const columns = [
        { key: 'placa', label: 'PLACA' },
        { key: 'cliente', label: 'CLIENTE' },
        { key: 'vehiculo', label: 'VEHÍCULO' },
        { key: 'servicio', label: 'SERVICIO' },
        { key: 'operativo', label: 'OPERATIVO' },
        {
            key: 'estado',
            label: 'ESTADO',
            render: (value: string) => <StatusBadge status={value as any} />
        },
        {
            key: 'accion',
            label: 'ACCIÓN',
            render: (_: any, row: any) => (
                <button
                    className="action-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        console.log('Ver detalles del servicio:', row)
                    }}
                    title="Ver detalles"
                >
                    ⋯
                </button>
            )
        }
    ]

    // Formatear hora
    const formattedTime = currentTime.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
    })

    const formattedDate = currentTime.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="dashboard-date">{formattedDate}</p>
                </div>
                <div className="dashboard-user">
                    <div className="time-display">
                        <span className="time-icon">🕐</span>
                        <span className="time-text">{formattedTime}</span>
                    </div>
                    <div className="user-info">
                        <span className="user-name">Bienvenido, {userName}</span>
                        <div className="user-avatar">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="logout-icon">🚪</span>
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Stats Cards */}
                <div className="stats-grid">
                    {statsCards.map((stat, index) => (
                        <Card key={index} className="stat-card">
                            <div className="stat-card-content">
                                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                                    {stat.icono}
                                </div>
                                <div className="stat-info">
                                    <p className="stat-title">{stat.titulo}</p>
                                    <p className="stat-value">{stat.valor}</p>
                                    <p className="stat-change positive">{stat.cambio}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Actividad Semanal */}
                <Card title="Actividad Semanal de Servicios" className="weekly-card">
                    <div className="weekly-activity">
                        <div className="week-days">
                            {weekDays.map((day, index) => (
                                <div key={day} className="day-item">
                                    <div className="day-bar-container">
                                        <div
                                            className="day-bar"
                                            style={{ height: `${weeklyActivity[index]}%` }}
                                        >
                                            <span className="bar-value">{weeklyActivity[index]}</span>
                                        </div>
                                    </div>
                                    <span className="day-label">{day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="weekly-legend">
                            <div className="legend-item">
                                <div className="legend-color" style={{ background: '#3b82f6' }}></div>
                                <span>Servicios realizados</span>
                            </div>
                            <div className="legend-total">
                                Total: 560 servicios esta semana
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Últimos Servicios y Servicios Populares */}
                <div className="dashboard-grid">
                    <Card title="Últimos Servicios Realizados" className="services-card">
                        <Table
                            columns={columns}
                            data={recentServices}
                            onRowClick={handleRowClick}
                        />
                        <div className="card-footer">
                            <button className="link-btn" onClick={handleViewAllServices}>
                                Ver todos los servicios →
                            </button>
                        </div>
                    </Card>

                    <Card title="Servicios Populares" className="popular-card">
                        <div className="popular-services">
                            {popularServices.map((service) => (
                                <div key={service.nombre} className="service-item">
                                    <div className="service-info">
                                        <span className="service-name">{service.nombre}</span>
                                        <span className="service-stats">
                                            <span className="service-percentage">{service.porcentaje}%</span>
                                            <span className="service-count">({service.cantidad})</span>
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${service.porcentaje}%`,
                                                backgroundColor: service.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card-footer">
                            <button className="link-btn" onClick={handleViewAllReports}>
                                Ver reporte completo →
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Sección de Acciones Rápidas */}
                <Card title="Acciones Rápidas" className="quick-actions-card">
                    <div className="quick-actions">
                        <button
                            className="quick-action-btn"
                            onClick={() => navigate('/servicios/nuevo')}
                        >
                            <span className="action-icon">🧼</span>
                            <span>Nuevo Servicio</span>
                        </button>
                        <button
                            className="quick-action-btn"
                            onClick={() => navigate('/clientes/nuevo')}
                        >
                            <span className="action-icon">👤</span>
                            <span>Registrar Cliente</span>
                        </button>
                        <button
                            className="quick-action-btn"
                            onClick={() => navigate('/vehiculos/nuevo')}
                        >
                            <span className="action-icon">🚗</span>
                            <span>Agregar Vehículo</span>
                        </button>
                        <button
                            className="quick-action-btn"
                            onClick={() => navigate('/reportes')}
                        >
                            <span className="action-icon">📊</span>
                            <span>Generar Reporte</span>
                        </button>
                    </div>
                </Card>
            </div>

            {/* Modal de detalles del servicio (opcional) */}
            {selectedService && (
                <div className="modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalles del Servicio</h3>
                        <p><strong>Placa:</strong> {selectedService.placa}</p>
                        <p><strong>Cliente:</strong> {selectedService.cliente}</p>
                        <p><strong>Vehículo:</strong> {selectedService.vehiculo}</p>
                        <p><strong>Servicio:</strong> {selectedService.servicio}</p>
                        <p><strong>Operativo:</strong> {selectedService.operativo}</p>
                        <p><strong>Estado:</strong> {selectedService.estado}</p>
                        <button onClick={() => setSelectedService(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard