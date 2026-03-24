import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import './Servicios.css'

// Interfaces
interface Vehiculo {
    id: number
    placa: string
    modelo: string
    marca: string
    cliente: string
}

interface Operativo {
    id: number
    nombre: string
    disponible: boolean
}

interface TipoServicio {
    id: number
    nombre: string
    precio: number
    duracion: number
}

interface Servicio {
    id: number
    hora: string
    vehiculo: string
    placa: string
    servicio: string
    operativo: string
    subtotal: number
    descuento: number
    total: number
    estado: 'finalizado' | 'en_proceso' | 'pendiente' | 'cancelado'
    fecha: string
}

// Datos de ejemplo
const tiposServiciosData: TipoServicio[] = [
    { id: 1, nombre: 'Lavado Exterior', precio: 15.00, duracion: 30 },
    { id: 2, nombre: 'Lavado Completo', precio: 25.00, duracion: 45 },
    { id: 3, nombre: 'Lavado Premium', precio: 35.00, duracion: 60 },
    { id: 4, nombre: 'Motor & Chassis', precio: 30.00, duracion: 50 },
    { id: 5, nombre: 'Limpieza Tapicería', precio: 20.00, duracion: 40 },
    { id: 6, nombre: 'Polimerizado', precio: 40.00, duracion: 90 },
    { id: 7, nombre: 'Encerado', precio: 18.00, duracion: 35 }
]

const operativosData: Operativo[] = [
    { id: 1, nombre: 'Carlos Ruiz', disponible: true },
    { id: 2, nombre: 'Juan Pérez', disponible: true },
    { id: 3, nombre: 'Miguel Sosa', disponible: true },
    { id: 4, nombre: 'Luis Suarez', disponible: false },
    { id: 5, nombre: 'Ana Martinez', disponible: true }
]

const vehiculosData: Vehiculo[] = [
    { id: 1, placa: 'ABC-1234', modelo: 'Corolla', marca: 'Toyota', cliente: 'Juan Pérez' },
    { id: 2, placa: 'XYZ-9876', modelo: 'Civic', marca: 'Honda', cliente: 'María García' },
    { id: 3, placa: 'DEF-4567', modelo: 'Mazda 3', marca: 'Mazda', cliente: 'Carlos López' },
    { id: 4, placa: 'PBC-5590', modelo: 'Hilux', marca: 'Toyota', cliente: 'Ricardo Montaner' },
    { id: 5, placa: 'GHY-8821', modelo: 'Versa', marca: 'Nissan', cliente: 'Mariana Esposito' },
    { id: 6, placa: 'LMX-0012', modelo: 'Focus', marca: 'Ford', cliente: 'Pedro Capo' }
]

const historialServiciosData: Servicio[] = [
    {
        id: 1,
        hora: '09:45 AM',
        vehiculo: 'Toyota Hilux',
        placa: 'PBC-5590',
        servicio: 'Lavado Completo',
        operativo: 'Carlos Ruiz',
        subtotal: 25.00,
        descuento: 0,
        total: 25.00,
        estado: 'finalizado',
        fecha: '2024-01-15'
    },
    {
        id: 2,
        hora: '10:15 AM',
        vehiculo: 'Nissan Versa',
        placa: 'GHY-8821',
        servicio: 'Polimerizado',
        operativo: 'Miguel Sosa',
        subtotal: 40.00,
        descuento: 0,
        total: 40.00,
        estado: 'en_proceso',
        fecha: '2024-01-15'
    },
    {
        id: 3,
        hora: '10:40 AM',
        vehiculo: 'Ford Focus',
        placa: 'LMX-0012',
        servicio: 'Lavado Exterior',
        operativo: 'Carlos Ruiz',
        subtotal: 15.00,
        descuento: 0,
        total: 15.00,
        estado: 'pendiente',
        fecha: '2024-01-15'
    },
    {
        id: 4,
        hora: '11:20 AM',
        vehiculo: 'Honda Civic',
        placa: 'XYZ-9876',
        servicio: 'Lavado Premium',
        operativo: 'Juan Pérez',
        subtotal: 35.00,
        descuento: 5.00,
        total: 30.00,
        estado: 'finalizado',
        fecha: '2024-01-15'
    },
    {
        id: 5,
        hora: '12:00 PM',
        vehiculo: 'Toyota Corolla',
        placa: 'ABC-1234',
        servicio: 'Motor & Chassis',
        operativo: 'Luis Suarez',
        subtotal: 30.00,
        descuento: 0,
        total: 30.00,
        estado: 'en_proceso',
        fecha: '2024-01-15'
    }
]

interface ServiciosProps {
    onNavigate?: (path: string) => void
}

const Servicios = ({ onNavigate }: ServiciosProps) => {
    const navigate = useNavigate()

    // Estado para el formulario
    const [vehiculos] = useState<Vehiculo[]>(vehiculosData)
    const [tiposServicios] = useState<TipoServicio[]>(tiposServiciosData)
    const [operativos] = useState<Operativo[]>(operativosData)
    const [historialServicios, setHistorialServicios] = useState<Servicio[]>(historialServiciosData)

    const [selectedVehiculo, setSelectedVehiculo] = useState<string>('')
    const [selectedServicio, setSelectedServicio] = useState<number>(0)
    const [selectedOperativo, setSelectedOperativo] = useState<string>('')
    const [descuento, setDescuento] = useState<number>(0)
    const [errors, setErrors] = useState<any>({})

    // Cálculos
    const servicioSeleccionado = tiposServicios.find(s => s.id === selectedServicio)
    const subtotal = servicioSeleccionado?.precio || 0
    const descuentoAplicado = descuento || 0
    const total = Math.max(0, subtotal - descuentoAplicado)

    // Filtrar operativos disponibles
    const operativosDisponibles = operativos.filter(op => op.disponible)

    // Obtener vehículo seleccionado
    const vehiculoSeleccionado = vehiculos.find(v => v.placa === selectedVehiculo)

    // Estado para filtros de historial
    const [filterEstado, setFilterEstado] = useState<string>('todos')
    const [searchTerm, setSearchTerm] = useState<string>('')

    // Filtrar historial
    const historialFiltrado = historialServicios.filter(servicio => {
        const matchesEstado = filterEstado === 'todos' || servicio.estado === filterEstado
        const matchesSearch = servicio.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            servicio.vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            servicio.cliente?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesEstado && matchesSearch
    })

    // Columnas para la tabla de historial
    const columns = [
        { key: 'hora', label: 'HORA' },
        { key: 'vehiculo', label: 'VEHÍCULO' },
        { key: 'placa', label: 'PLACA' },
        { key: 'servicio', label: 'SERVICIO' },
        { key: 'operativo', label: 'OPERATIVO' },
        {
            key: 'total',
            label: 'TOTAL',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: 'estado',
            label: 'ESTADO',
            render: (value: string) => <StatusBadge status={value as any} />
        },
        {
            key: 'accion',
            label: 'ACCIÓN',
            render: (_: any, row: Servicio) => (
                <button
                    className="detail-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(row)
                    }}
                >
                    Detalle
                </button>
            )
        }
    ]

    const handleViewDetails = (servicio: Servicio) => {
        console.log('Ver detalles del servicio:', servicio)
        // Aquí puedes abrir un modal con los detalles
        alert(`Detalles del servicio:\n\nVehículo: ${servicio.vehiculo}\nPlaca: ${servicio.placa}\nServicio: ${servicio.servicio}\nOperativo: ${servicio.operativo}\nTotal: $${servicio.total}\nEstado: ${servicio.estado}`)
    }

    const handleRegistrarServicio = () => {
        // Validaciones
        const newErrors: any = {}
        if (!selectedVehiculo) newErrors.vehiculo = 'Seleccione un vehículo'
        if (!selectedServicio) newErrors.servicio = 'Seleccione un tipo de servicio'
        if (!selectedOperativo) newErrors.operativo = 'Seleccione un operativo'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Crear nuevo servicio
        const now = new Date()
        const hora = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
        const fecha = now.toISOString().split('T')[0]

        const nuevoServicio: Servicio = {
            id: historialServicios.length + 1,
            hora,
            vehiculo: vehiculoSeleccionado?.modelo || '',
            placa: selectedVehiculo,
            servicio: servicioSeleccionado?.nombre || '',
            operativo: selectedOperativo,
            subtotal,
            descuento: descuentoAplicado,
            total,
            estado: 'pendiente',
            fecha
        }

        setHistorialServicios([nuevoServicio, ...historialServicios])

        // Limpiar formulario
        setSelectedVehiculo('')
        setSelectedServicio(0)
        setSelectedOperativo('')
        setDescuento(0)
        setErrors({})

        alert('Servicio registrado exitosamente')
    }

    const handleExportExcel = () => {
        console.log('Exportando a Excel...')
        alert('Exportando a Excel...')
    }

    const handleExportPDF = () => {
        console.log('Exportando a PDF...')
        alert('Exportando a PDF...')
    }

    const handleLimpiarFormulario = () => {
        setSelectedVehiculo('')
        setSelectedServicio(0)
        setSelectedOperativo('')
        setDescuento(0)
        setErrors({})
    }

    const handleDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0
        setDescuento(Math.min(value, subtotal)) // No permitir descuento mayor al subtotal
    }

    return (
        <div className="servicios-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">WashMaster PRO</h1>
                    <p className="page-subtitle">Panel de Control de Servicios</p>
                </div>
            </div>

            <div className="servicios-content">
                {/* Formulario de Registro */}
                <Card title="Nuevo Registro de Servicio" className="registro-card">
                    <div className="formulario-servicio">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Vehículo (Placa) *</label>
                                <select
                                    className="select-field"
                                    value={selectedVehiculo}
                                    onChange={(e) => {
                                        setSelectedVehiculo(e.target.value)
                                        if (errors.vehiculo) setErrors({ ...errors, vehiculo: '' })
                                    }}
                                >
                                    <option value="">-- Seleccione un vehículo --</option>
                                    {vehiculos.map(vehiculo => (
                                        <option key={vehiculo.id} value={vehiculo.placa}>
                                            {vehiculo.placa} - {vehiculo.marca} {vehiculo.modelo} ({vehiculo.cliente})
                                        </option>
                                    ))}
                                </select>
                                {errors.vehiculo && <span className="error-text">{errors.vehiculo}</span>}
                            </div>

                            <div className="form-group">
                                <label>Tipo de Servicio *</label>
                                <select
                                    className="select-field"
                                    value={selectedServicio}
                                    onChange={(e) => {
                                        setSelectedServicio(parseInt(e.target.value))
                                        if (errors.servicio) setErrors({ ...errors, servicio: '' })
                                    }}
                                >
                                    <option value="0">-- Seleccione --</option>
                                    {tiposServicios.map(servicio => (
                                        <option key={servicio.id} value={servicio.id}>
                                            {servicio.nombre} - ${servicio.precio.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                                {errors.servicio && <span className="error-text">{errors.servicio}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Operativo (Lavador) *</label>
                                <select
                                    className="select-field"
                                    value={selectedOperativo}
                                    onChange={(e) => {
                                        setSelectedOperativo(e.target.value)
                                        if (errors.operativo) setErrors({ ...errors, operativo: '' })
                                    }}
                                >
                                    <option value="">-- Seleccione un operativo --</option>
                                    {operativosDisponibles.map(operativo => (
                                        <option key={operativo.id} value={operativo.nombre}>
                                            {operativo.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.operativo && <span className="error-text">{errors.operativo}</span>}
                            </div>

                            <div className="form-group">
                                <label>Descuento ($)</label>
                                <Input
                                    type="number"
                                    name="descuento"
                                    value={descuento}
                                    onChange={handleDescuentoChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    max={subtotal}
                                />
                            </div>
                        </div>

                        <div className="resumen-pago">
                            <div className="resumen-line">
                                <span>Subtotal:</span>
                                <span className="resumen-value">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="resumen-line">
                                <span>Descuento:</span>
                                <span className="resumen-value discount">-${descuentoAplicado.toFixed(2)}</span>
                            </div>
                            <div className="resumen-line total">
                                <span>Total a Pagar:</span>
                                <span className="resumen-value">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button variant="secondary" onClick={handleLimpiarFormulario}>
                                Limpiar
                            </Button>
                            <Button variant="primary" onClick={handleRegistrarServicio}>
                                REGISTRAR SERVICIO
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Historial de Servicios */}
                <Card
                    title="Historial de Servicios del Día"
                    className="historial-card"
                    subtitle="Visualiza y exporta los registros de hoy"
                >
                    <div className="historial-header">
                        <div className="historial-filters">
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={filterEstado}
                                    onChange={(e) => setFilterEstado(e.target.value)}
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en_proceso">En Proceso</option>
                                    <option value="finalizado">Finalizado</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <Input
                                    type="text"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por placa o vehículo..."
                                />
                            </div>
                        </div>
                        <div className="export-buttons">
                            <button className="export-btn excel" onClick={handleExportExcel}>
                                📊 Excel
                            </button>
                            <button className="export-btn pdf" onClick={handleExportPDF}>
                                📄 Reporte PDF
                            </button>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        data={historialFiltrado}
                    />

                    <div className="table-footer">
                        <span>Mostrando {historialFiltrado.length} de {historialServicios.length} registros</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Servicios