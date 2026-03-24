import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import Table from '../common/Table'
import './Vehiculos.css'

// Interfaces
interface Vehiculo {
    id: number
    placa: string
    modelo: string
    marca: string
    color: string
    anio: number
    clienteId: number
    clienteNombre: string
    tipo: 'auto' | 'camioneta' | 'camion' | 'moto'
    motor?: string
    chasis?: string
    observaciones?: string
    fechaRegistro: string
    ultimoServicio?: string
    historialServicios: number
}

interface Cliente {
    id: number
    nombre: string
    telefono: string
    email: string
}

interface Marca {
    id: number
    nombre: string
    pais: string
}

// Datos de ejemplo
const clientesData: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez', telefono: '555-0123', email: 'juan.perez@email.com' },
    { id: 2, nombre: 'María García', telefono: '555-0456', email: 'maria.garcia@email.com' },
    { id: 3, nombre: 'Carlos López', telefono: '555-0789', email: 'carlos.lopez@email.com' },
    { id: 4, nombre: 'Ana Martínez', telefono: '555-0321', email: 'ana.martinez@email.com' },
    { id: 5, nombre: 'Ricardo Montaner', telefono: '555-0987', email: 'ricardo@email.com' },
    { id: 6, nombre: 'Mariana Esposito', telefono: '555-0654', email: 'mariana@email.com' }
]

const marcasData: Marca[] = [
    { id: 1, nombre: 'Toyota', pais: 'Japón' },
    { id: 2, nombre: 'Honda', pais: 'Japón' },
    { id: 3, nombre: 'Nissan', pais: 'Japón' },
    { id: 4, nombre: 'Ford', pais: 'USA' },
    { id: 5, nombre: 'Chevrolet', pais: 'USA' },
    { id: 6, nombre: 'Volkswagen', pais: 'Alemania' },
    { id: 7, nombre: 'Mazda', pais: 'Japón' },
    { id: 8, nombre: 'Hyundai', pais: 'Corea del Sur' },
    { id: 9, nombre: 'Kia', pais: 'Corea del Sur' },
    { id: 10, nombre: 'BMW', pais: 'Alemania' }
]

const vehiculosData: Vehiculo[] = [
    {
        id: 1,
        placa: 'ABC-1234',
        modelo: 'Corolla',
        marca: 'Toyota',
        color: 'Gris',
        anio: 2022,
        clienteId: 1,
        clienteNombre: 'Juan Pérez',
        tipo: 'auto',
        observaciones: 'Cliente frecuente',
        fechaRegistro: '2024-01-10',
        ultimoServicio: '2024-01-15',
        historialServicios: 3
    },
    {
        id: 2,
        placa: 'XYZ-9876',
        modelo: 'Civic',
        marca: 'Honda',
        color: 'Azul',
        anio: 2023,
        clienteId: 2,
        clienteNombre: 'María García',
        tipo: 'auto',
        fechaRegistro: '2024-01-12',
        ultimoServicio: '2024-01-14',
        historialServicios: 2
    },
    {
        id: 3,
        placa: 'DEF-4567',
        modelo: 'Mazda 3',
        marca: 'Mazda',
        color: 'Rojo',
        anio: 2021,
        clienteId: 3,
        clienteNombre: 'Carlos López',
        tipo: 'auto',
        fechaRegistro: '2024-01-05',
        ultimoServicio: '2024-01-13',
        historialServicios: 5
    },
    {
        id: 4,
        placa: 'GHI-7890',
        modelo: 'Hilux',
        marca: 'Toyota',
        color: 'Blanco',
        anio: 2024,
        clienteId: 5,
        clienteNombre: 'Ricardo Montaner',
        tipo: 'camioneta',
        observaciones: 'Vehículo de trabajo',
        fechaRegistro: '2024-01-08',
        ultimoServicio: '2024-01-15',
        historialServicios: 1
    },
    {
        id: 5,
        placa: 'JKL-0012',
        modelo: 'Versa',
        marca: 'Nissan',
        color: 'Negro',
        anio: 2023,
        clienteId: 6,
        clienteNombre: 'Mariana Esposito',
        tipo: 'auto',
        fechaRegistro: '2024-01-09',
        ultimoServicio: '2024-01-14',
        historialServicios: 2
    },
    {
        id: 6,
        placa: 'MNO-3456',
        modelo: 'F-150',
        marca: 'Ford',
        color: 'Azul',
        anio: 2022,
        clienteId: 4,
        clienteNombre: 'Ana Martínez',
        tipo: 'camioneta',
        observaciones: 'Requiere cuidado especial',
        fechaRegistro: '2024-01-11',
        ultimoServicio: '2024-01-12',
        historialServicios: 4
    },
    {
        id: 7,
        placa: 'PQR-7890',
        modelo: 'Jetta',
        marca: 'Volkswagen',
        color: 'Plata',
        anio: 2024,
        clienteId: 1,
        clienteNombre: 'Juan Pérez',
        tipo: 'auto',
        fechaRegistro: '2024-01-14',
        historialServicios: 0
    }
]

interface VehiculosProps {
    onNavigate?: (path: string) => void
}

const Vehiculos = ({ onNavigate }: VehiculosProps) => {
    const navigate = useNavigate()

    // Estados
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>(vehiculosData)
    const [clientes] = useState<Cliente[]>(clientesData)
    const [marcas] = useState<Marca[]>(marcasData)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMarca, setSelectedMarca] = useState('todas')
    const [selectedTipo, setSelectedTipo] = useState('todos')
    const [selectedCliente, setSelectedCliente] = useState<number | null>(null)
    const [showAddVehicle, setShowAddVehicle] = useState(false)
    const [showEditVehicle, setShowEditVehicle] = useState<Vehiculo | null>(null)
    const [selectedVehicle, setSelectedVehicle] = useState<Vehiculo | null>(null)
    const [showHistorial, setShowHistorial] = useState<Vehiculo | null>(null)

    // Estado para nuevo vehículo
    const [nuevoVehiculo, setNuevoVehiculo] = useState({
        placa: '',
        modelo: '',
        marca: '',
        color: '',
        anio: new Date().getFullYear(),
        clienteId: 0,
        tipo: 'auto' as const,
        motor: '',
        chasis: '',
        observaciones: ''
    })

    const [errors, setErrors] = useState<any>({})

    // Estadísticas
    const totalVehiculos = vehiculos.length
    const vehiculosPorMarca = marcas.map(marca => ({
        nombre: marca.nombre,
        cantidad: vehiculos.filter(v => v.marca === marca.nombre).length
    })).filter(m => m.cantidad > 0)
    const vehiculosRecientes = vehiculos.filter(v => {
        const fecha = new Date(v.fechaRegistro)
        const hoy = new Date()
        const diffTime = Math.abs(hoy.getTime() - fecha.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
    }).length

    // Filtrar vehículos
    const vehiculosFiltrados = vehiculos.filter(vehiculo => {
        const matchesSearch = vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehiculo.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesMarca = selectedMarca === 'todas' || vehiculo.marca === selectedMarca
        const matchesTipo = selectedTipo === 'todos' || vehiculo.tipo === selectedTipo
        const matchesCliente = !selectedCliente || vehiculo.clienteId === selectedCliente
        return matchesSearch && matchesMarca && matchesTipo && matchesCliente
    })

    // Columnas para la tabla
    const columns = [
        { key: 'placa', label: 'PLACA' },
        { key: 'marca', label: 'MARCA' },
        { key: 'modelo', label: 'MODELO' },
        { key: 'color', label: 'COLOR' },
        { key: 'anio', label: 'AÑO' },
        {
            key: 'tipo',
            label: 'TIPO',
            render: (value: string) => {
                const tipos: Record<string, string> = {
                    auto: '🚗 Auto',
                    camioneta: '🚙 Camioneta',
                    camion: '🚚 Camión',
                    moto: '🏍️ Moto'
                }
                return tipos[value] || value
            }
        },
        { key: 'clienteNombre', label: 'PROPIETARIO' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            render: (_: any, row: Vehiculo) => (
                <div className="action-buttons">
                    <button
                        className="icon-btn view-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVehicle(row)
                        }}
                        title="Ver detalles"
                    >
                        👁️
                    </button>
                    <button
                        className="icon-btn history-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowHistorial(row)
                        }}
                        title="Ver historial"
                    >
                        📋
                    </button>
                    <button
                        className="icon-btn edit-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEditVehicle(row)
                        }}
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        className="icon-btn delete-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteVehicle(row.id)
                        }}
                        title="Eliminar"
                    >
                        🗑️
                    </button>
                </div>
            )
        }
    ]

    const handleEditVehicle = (vehiculo: Vehiculo) => {
        setShowEditVehicle(vehiculo)
        setNuevoVehiculo({
            placa: vehiculo.placa,
            modelo: vehiculo.modelo,
            marca: vehiculo.marca,
            color: vehiculo.color,
            anio: vehiculo.anio,
            clienteId: vehiculo.clienteId,
            tipo: vehiculo.tipo,
            motor: vehiculo.motor || '',
            chasis: vehiculo.chasis || '',
            observaciones: vehiculo.observaciones || ''
        })
    }

    const handleDeleteVehicle = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este vehículo?\nEsta acción también eliminará el historial de servicios asociado.')) {
            setVehiculos(vehiculos.filter(v => v.id !== id))
            if (selectedVehicle?.id === id) setSelectedVehicle(null)
            if (showHistorial?.id === id) setShowHistorial(null)
            alert('Vehículo eliminado exitosamente')
        }
    }

    const handleAddVehicle = () => {
        // Validaciones
        const newErrors: any = {}
        if (!nuevoVehiculo.placa) newErrors.placa = 'La placa es requerida'
        else if (!/^[A-Z0-9]{3,10}$/i.test(nuevoVehiculo.placa.replace(/[-]/g, '')))
            newErrors.placa = 'Formato de placa inválido'
        if (!nuevoVehiculo.marca) newErrors.marca = 'La marca es requerida'
        if (!nuevoVehiculo.modelo) newErrors.modelo = 'El modelo es requerido'
        if (!nuevoVehiculo.color) newErrors.color = 'El color es requerido'
        if (!nuevoVehiculo.anio) newErrors.anio = 'El año es requerido'
        else if (nuevoVehiculo.anio < 1900 || nuevoVehiculo.anio > new Date().getFullYear() + 1)
            newErrors.anio = 'Año inválido'
        if (!nuevoVehiculo.clienteId) newErrors.clienteId = 'Debe seleccionar un cliente'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Verificar placa única
        const placaExiste = vehiculos.some(v => v.placa === nuevoVehiculo.placa &&
            (!showEditVehicle || v.id !== showEditVehicle?.id))
        if (placaExiste) {
            setErrors({ placa: 'Esta placa ya está registrada' })
            return
        }

        const cliente = clientes.find(c => c.id === nuevoVehiculo.clienteId)

        if (showEditVehicle) {
            // Editar vehículo existente
            setVehiculos(vehiculos.map(v =>
                v.id === showEditVehicle.id
                    ? {
                        ...v,
                        ...nuevoVehiculo,
                        clienteNombre: cliente?.nombre || ''
                    }
                    : v
            ))
            alert('Vehículo actualizado exitosamente')
        } else {
            // Crear nuevo vehículo
            const newVehicle: Vehiculo = {
                id: vehiculos.length + 1,
                ...nuevoVehiculo,
                clienteNombre: cliente?.nombre || '',
                fechaRegistro: new Date().toISOString().split('T')[0],
                historialServicios: 0
            }
            setVehiculos([...vehiculos, newVehicle])
            alert('Vehículo registrado exitosamente')
        }

        resetForm()
    }

    const resetForm = () => {
        setNuevoVehiculo({
            placa: '',
            modelo: '',
            marca: '',
            color: '',
            anio: new Date().getFullYear(),
            clienteId: 0,
            tipo: 'auto',
            motor: '',
            chasis: '',
            observaciones: ''
        })
        setErrors({})
        setShowAddVehicle(false)
        setShowEditVehicle(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNuevoVehiculo(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const handleVerServicios = (vehiculo: Vehiculo) => {
        if (onNavigate) {
            onNavigate('/servicios')
        } else {
            navigate('/servicios')
        }
    }

    // Datos de historial de servicios (ejemplo)
    const getHistorialServicios = (vehiculoId: number) => {
        return [
            { fecha: '2024-01-15', servicio: 'Lavado Premium', total: 35.00, operativo: 'Carlos Ruiz' },
            { fecha: '2024-01-10', servicio: 'Lavado Completo', total: 25.00, operativo: 'Juan Pérez' },
            { fecha: '2024-01-05', servicio: 'Lavado Exterior', total: 15.00, operativo: 'Carlos Ruiz' }
        ]
    }

    return (
        <div className="vehiculos-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gestión de Vehículos</h1>
                    <p className="page-subtitle">Registro y control de vehículos por cliente</p>
                </div>
                <Button variant="primary" onClick={() => setShowAddVehicle(true)}>
                    + Registrar Vehículo
                </Button>
            </div>

            <div className="vehiculos-content">
                {/* Tarjetas de Estadísticas */}
                <div className="stats-grid">
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">🚗</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Total Vehículos</p>
                            <p className="stat-value-mini">{totalVehiculos}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">📊</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Marcas Diferentes</p>
                            <p className="stat-value-mini">{vehiculosPorMarca.length}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">🆕</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Vehículos Nuevos</p>
                            <p className="stat-value-mini">{vehiculosRecientes}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">👥</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Clientes con Vehículos</p>
                            <p className="stat-value-mini">{new Set(vehiculos.map(v => v.clienteId)).size}</p>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Marcas */}
                {vehiculosPorMarca.length > 0 && (
                    <Card title="Distribución por Marca" className="marcas-card">
                        <div className="marcas-chart">
                            {vehiculosPorMarca.map((marca, index) => (
                                <div key={index} className="marca-item">
                                    <div className="marca-info">
                                        <span className="marca-nombre">{marca.nombre}</span>
                                        <span className="marca-cantidad">{marca.cantidad} vehículos</span>
                                    </div>
                                    <div className="marca-bar-container">
                                        <div
                                            className="marca-bar-fill"
                                            style={{
                                                width: `${(marca.cantidad / totalVehiculos) * 100}%`,
                                                backgroundColor: `hsl(${index * 45}, 70%, 50%)`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Lista de Vehículos */}
                <Card className="vehiculos-list-card">
                    <div className="vehiculos-header">
                        <div className="filters">
                            <div className="search-wrapper">
                                <Input
                                    type="text"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por placa, modelo, marca o propietario..."
                                />
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedMarca}
                                    onChange={(e) => setSelectedMarca(e.target.value)}
                                >
                                    <option value="todas">Todas las marcas</option>
                                    {marcas.map(marca => (
                                        <option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedTipo}
                                    onChange={(e) => setSelectedTipo(e.target.value)}
                                >
                                    <option value="todos">Todos los tipos</option>
                                    <option value="auto">🚗 Auto</option>
                                    <option value="camioneta">🚙 Camioneta</option>
                                    <option value="camion">🚚 Camión</option>
                                    <option value="moto">🏍️ Moto</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedCliente || ''}
                                    onChange={(e) => setSelectedCliente(e.target.value ? parseInt(e.target.value) : null)}
                                >
                                    <option value="">Todos los clientes</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        data={vehiculosFiltrados}
                    />

                    <div className="table-footer">
                        <span>Mostrando {vehiculosFiltrados.length} de {vehiculos.length} vehículos</span>
                    </div>
                </Card>
            </div>

            {/* Modal para Detalles del Vehículo */}
            {selectedVehicle && (
                <div className="modal-overlay" onClick={() => setSelectedVehicle(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalles del Vehículo</h3>
                        <div className="vehicle-details-modal">
                            <div className="detail-row">
                                <strong>Placa:</strong> {selectedVehicle.placa}
                            </div>
                            <div className="detail-row">
                                <strong>Marca:</strong> {selectedVehicle.marca}
                            </div>
                            <div className="detail-row">
                                <strong>Modelo:</strong> {selectedVehicle.modelo}
                            </div>
                            <div className="detail-row">
                                <strong>Color:</strong> {selectedVehicle.color}
                            </div>
                            <div className="detail-row">
                                <strong>Año:</strong> {selectedVehicle.anio}
                            </div>
                            <div className="detail-row">
                                <strong>Tipo:</strong> {
                                    selectedVehicle.tipo === 'auto' ? '🚗 Auto' :
                                        selectedVehicle.tipo === 'camioneta' ? '🚙 Camioneta' :
                                            selectedVehicle.tipo === 'camion' ? '🚚 Camión' : '🏍️ Moto'
                                }
                            </div>
                            <div className="detail-row">
                                <strong>Propietario:</strong> {selectedVehicle.clienteNombre}
                            </div>
                            {selectedVehicle.motor && (
                                <div className="detail-row">
                                    <strong>N° Motor:</strong> {selectedVehicle.motor}
                                </div>
                            )}
                            {selectedVehicle.chasis && (
                                <div className="detail-row">
                                    <strong>N° Chasis:</strong> {selectedVehicle.chasis}
                                </div>
                            )}
                            <div className="detail-row">
                                <strong>Fecha Registro:</strong> {selectedVehicle.fechaRegistro}
                            </div>
                            {selectedVehicle.ultimoServicio && (
                                <div className="detail-row">
                                    <strong>Último Servicio:</strong> {selectedVehicle.ultimoServicio}
                                </div>
                            )}
                            <div className="detail-row">
                                <strong>Total Servicios:</strong> {selectedVehicle.historialServicios}
                            </div>
                            {selectedVehicle.observaciones && (
                                <div className="detail-row">
                                    <strong>Observaciones:</strong> {selectedVehicle.observaciones}
                                </div>
                            )}
                        </div>
                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setSelectedVehicle(null)}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => {
                                handleEditVehicle(selectedVehicle)
                                setSelectedVehicle(null)
                            }}>
                                Editar Vehículo
                            </Button>
                            <Button variant="secondary" onClick={() => handleVerServicios(selectedVehicle)}>
                                Ver Servicios
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Historial de Servicios */}
            {showHistorial && (
                <div className="modal-overlay" onClick={() => setShowHistorial(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>Historial de Servicios</h3>
                        <p className="modal-subtitle">Vehículo: <strong>{showHistorial.marca} {showHistorial.modelo}</strong> - Placa: {showHistorial.placa}</p>

                        {getHistorialServicios(showHistorial.id).length === 0 ? (
                            <div className="no-historial">
                                <p>No hay servicios registrados para este vehículo</p>
                            </div>
                        ) : (
                            <div className="historial-tabla">
                                <table className="reporte-tabla">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Servicio</th>
                                            <th>Total</th>
                                            <th>Operativo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHistorialServicios(showHistorial.id).map((servicio, index) => (
                                            <tr key={index}>
                                                <td>{servicio.fecha}</td>
                                                <td>{servicio.servicio}</td>
                                                <td>${servicio.total.toFixed(2)}</td>
                                                <td>{servicio.operativo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setShowHistorial(null)}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => handleVerServicios(showHistorial)}>
                                Registrar Nuevo Servicio
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Agregar/Editar Vehículo */}
            {(showAddVehicle || showEditVehicle) && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>{showEditVehicle ? 'Editar Vehículo' : 'Registrar Nuevo Vehículo'}</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Placa *</label>
                                <Input
                                    type="text"
                                    name="placa"
                                    value={nuevoVehiculo.placa}
                                    onChange={handleInputChange}
                                    placeholder="ABC-1234"
                                    error={errors.placa}
                                />
                            </div>

                            <div className="form-group">
                                <label>Marca *</label>
                                <select
                                    name="marca"
                                    className="select-field"
                                    value={nuevoVehiculo.marca}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione una marca</option>
                                    {marcas.map(marca => (
                                        <option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
                                    ))}
                                </select>
                                {errors.marca && <span className="error-text">{errors.marca}</span>}
                            </div>

                            <div className="form-group">
                                <label>Modelo *</label>
                                <Input
                                    type="text"
                                    name="modelo"
                                    value={nuevoVehiculo.modelo}
                                    onChange={handleInputChange}
                                    placeholder="Corolla"
                                    error={errors.modelo}
                                />
                            </div>

                            <div className="form-group">
                                <label>Color *</label>
                                <Input
                                    type="text"
                                    name="color"
                                    value={nuevoVehiculo.color}
                                    onChange={handleInputChange}
                                    placeholder="Rojo"
                                    error={errors.color}
                                />
                            </div>

                            <div className="form-group">
                                <label>Año *</label>
                                <Input
                                    type="number"
                                    name="anio"
                                    value={nuevoVehiculo.anio}
                                    onChange={handleInputChange}
                                    placeholder="2024"
                                    error={errors.anio}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tipo de Vehículo *</label>
                                <select
                                    name="tipo"
                                    className="select-field"
                                    value={nuevoVehiculo.tipo}
                                    onChange={handleInputChange}
                                >
                                    <option value="auto">🚗 Auto</option>
                                    <option value="camioneta">🚙 Camioneta</option>
                                    <option value="camion">🚚 Camión</option>
                                    <option value="moto">🏍️ Moto</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Propietario *</label>
                                <select
                                    name="clienteId"
                                    className="select-field"
                                    value={nuevoVehiculo.clienteId}
                                    onChange={handleInputChange}
                                >
                                    <option value="0">Seleccione un cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nombre} - {cliente.telefono}
                                        </option>
                                    ))}
                                </select>
                                {errors.clienteId && <span className="error-text">{errors.clienteId}</span>}
                            </div>

                            <div className="form-group">
                                <label>N° Motor</label>
                                <Input
                                    type="text"
                                    name="motor"
                                    value={nuevoVehiculo.motor}
                                    onChange={handleInputChange}
                                    placeholder="Opcional"
                                />
                            </div>

                            <div className="form-group">
                                <label>N° Chasis</label>
                                <Input
                                    type="text"
                                    name="chasis"
                                    value={nuevoVehiculo.chasis}
                                    onChange={handleInputChange}
                                    placeholder="Opcional"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Observaciones</label>
                                <textarea
                                    name="observaciones"
                                    className="textarea-field"
                                    value={nuevoVehiculo.observaciones}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Notas adicionales sobre el vehículo..."
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleAddVehicle}>
                                {showEditVehicle ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Vehiculos