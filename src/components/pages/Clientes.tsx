import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import Table from '../common/Table'
import './Clientes.css'

// Interfaces
interface Cliente {
    id: number
    nombre: string
    telefono: string
    email: string
    vehiculos: number
    direccion?: string
    fechaRegistro: string
}

interface Vehiculo {
    id: number
    placa: string
    modelo: string
    marca: string
    color: string
    clienteId: number
}

interface NuevoVehiculo {
    placa: string
    modelo: string
    marca: string
    color: string
}

// Datos de ejemplo
const clientesData: Cliente[] = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        telefono: '555-0123',
        email: 'juan.perez@email.com',
        vehiculos: 2,
        fechaRegistro: '2024-01-10'
    },
    {
        id: 2,
        nombre: 'María García',
        telefono: '555-0456',
        email: 'maria.garcia@email.com',
        vehiculos: 1,
        fechaRegistro: '2024-01-12'
    },
    {
        id: 3,
        nombre: 'Carlos López',
        telefono: '555-0789',
        email: 'carlos.lopez@email.com',
        vehiculos: 3,
        fechaRegistro: '2024-01-05'
    },
    {
        id: 4,
        nombre: 'Ana Martínez',
        telefono: '555-0321',
        email: 'ana.martinez@email.com',
        vehiculos: 1,
        fechaRegistro: '2024-01-15'
    }
]

const vehiculosData: Vehiculo[] = [
    {
        id: 1,
        placa: 'ABC-1234',
        modelo: 'Corolla',
        marca: 'Toyota',
        color: 'Gris',
        clienteId: 1
    },
    {
        id: 2,
        placa: 'XYZ-9876',
        modelo: 'Civic',
        marca: 'Honda',
        color: 'Azul',
        clienteId: 1
    },
    {
        id: 3,
        placa: 'DEF-4567',
        modelo: 'Mazda 3',
        marca: 'Mazda',
        color: 'Rojo',
        clienteId: 2
    },
    {
        id: 4,
        placa: 'GHI-7890',
        modelo: 'Hilux',
        marca: 'Toyota',
        color: 'Blanco',
        clienteId: 3
    }
]

interface ClientesProps {
    onNavigate?: (path: string) => void
}

const Clientes = ({ onNavigate }: ClientesProps) => {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState<Cliente[]>(clientesData)
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>(vehiculosData)
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
    const [showAddVehicle, setShowAddVehicle] = useState(false)
    const [showAddCliente, setShowAddCliente] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [nuevoVehiculo, setNuevoVehiculo] = useState<NuevoVehiculo>({
        placa: '',
        modelo: '',
        marca: '',
        color: ''
    })
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        telefono: '',
        email: '',
        direccion: ''
    })
    const [errors, setErrors] = useState<any>({})

    // Filtrar clientes por búsqueda
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.telefono.includes(searchTerm) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Obtener vehículos de un cliente
    const getVehiculosByCliente = (clienteId: number) => {
        return vehiculos.filter(v => v.clienteId === clienteId)
    }

    // Columnas para la tabla de clientes
    const columns = [
        { key: 'nombre', label: 'NOMBRE COMPLETO' },
        { key: 'telefono', label: 'TELÉFONO' },
        { key: 'email', label: 'EMAIL' },
        { key: 'vehiculos', label: 'VEHÍCULOS' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            render: (_: any, row: Cliente) => (
                <div className="action-buttons">
                    <button
                        className="icon-btn view-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSelectCliente(row)
                        }}
                        title="Ver detalles"
                    >
                        👁️
                    </button>
                    <button
                        className="icon-btn edit-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEditCliente(row)
                        }}
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        className="icon-btn delete-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteCliente(row.id)
                        }}
                        title="Eliminar"
                    >
                        🗑️
                    </button>
                </div>
            )
        }
    ]

    const handleSelectCliente = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setShowAddVehicle(false)
    }

    const handleEditCliente = (cliente: Cliente) => {
        console.log('Editar cliente:', cliente)
        // Aquí iría la lógica para editar cliente
    }

    const handleDeleteCliente = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            setClientes(clientes.filter(c => c.id !== id))
            if (selectedCliente?.id === id) {
                setSelectedCliente(null)
            }
        }
    }

    const handleAddVehiculo = () => {
        // Validar campos
        const newErrors: any = {}
        if (!nuevoVehiculo.placa) newErrors.placa = 'La placa es requerida'
        if (!nuevoVehiculo.modelo) newErrors.modelo = 'El modelo es requerido'
        if (!nuevoVehiculo.marca) newErrors.marca = 'La marca es requerida'
        if (!nuevoVehiculo.color) newErrors.color = 'El color es requerido'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Verificar si la placa ya existe
        const placaExiste = vehiculos.some(v => v.placa === nuevoVehiculo.placa)
        if (placaExiste) {
            setErrors({ placa: 'Esta placa ya está registrada' })
            return
        }

        // Crear nuevo vehículo
        const nuevoVehiculoObj: Vehiculo = {
            id: vehiculos.length + 1,
            ...nuevoVehiculo,
            clienteId: selectedCliente!.id
        }

        setVehiculos([...vehiculos, nuevoVehiculoObj])

        // Actualizar contador de vehículos del cliente
        setClientes(clientes.map(c =>
            c.id === selectedCliente!.id
                ? { ...c, vehiculos: c.vehiculos + 1 }
                : c
        ))

        // Limpiar formulario y cerrar
        setNuevoVehiculo({ placa: '', modelo: '', marca: '', color: '' })
        setShowAddVehicle(false)
        setErrors({})

        alert('Vehículo registrado exitosamente')
    }

    const handleAddCliente = () => {
        // Validar campos
        const newErrors: any = {}
        if (!nuevoCliente.nombre) newErrors.nombre = 'El nombre es requerido'
        if (!nuevoCliente.telefono) newErrors.telefono = 'El teléfono es requerido'
        if (!nuevoCliente.email) newErrors.email = 'El email es requerido'
        else if (!/\S+@\S+\.\S+/.test(nuevoCliente.email)) newErrors.email = 'Email inválido'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Crear nuevo cliente
        const nuevoClienteObj: Cliente = {
            id: clientes.length + 1,
            ...nuevoCliente,
            vehiculos: 0,
            fechaRegistro: new Date().toISOString().split('T')[0]
        }

        setClientes([...clientes, nuevoClienteObj])

        // Limpiar formulario y cerrar
        setNuevoCliente({ nombre: '', telefono: '', email: '', direccion: '' })
        setShowAddCliente(false)
        setErrors({})

        alert('Cliente registrado exitosamente')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: any, formData: any) => {
        const { name, value } = e.target
        setter({ ...formData, [name]: value })
        // Limpiar error del campo
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const handleRowClick = (row: Cliente) => {
        handleSelectCliente(row)
    }

    const handleBackToList = () => {
        setSelectedCliente(null)
        setShowAddVehicle(false)
    }

    return (
        <div className="clientes-page">
            <div className="page-header">
                <h1 className="page-title">SISTEMA DE CONTROL DE AUTOLAVADO</h1>
                <Button
                    variant="primary"
                    onClick={() => setShowAddCliente(true)}
                >
                    + Nuevo Cliente
                </Button>
            </div>

            <div className="clientes-content">
                {/* Lista de Clientes */}
                {!selectedCliente ? (
                    <Card className="clientes-list-card">
                        <div className="search-bar">
                            <Input
                                type="text"
                                name="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre, teléfono o email..."
                            />
                        </div>
                        <Table
                            columns={columns}
                            data={clientesFiltrados}
                            onRowClick={handleRowClick}
                        />
                        <div className="table-footer">
                            <span>Total de clientes: {clientesFiltrados.length}</span>
                        </div>
                    </Card>
                ) : (
                    /* Detalles del Cliente */
                    <div className="cliente-details">
                        <div className="details-header">
                            <button className="back-btn" onClick={handleBackToList}>
                                ← Volver a la lista
                            </button>
                            <h2>Detalles del Cliente</h2>
                        </div>

                        <div className="details-grid">
                            {/* Información del Cliente */}
                            <Card title="CLIENTE SELECCIONADO" className="cliente-info-card">
                                <div className="cliente-info">
                                    <p><strong>Nombre:</strong> {selectedCliente.nombre}</p>
                                    <p><strong>Teléfono:</strong> {selectedCliente.telefono}</p>
                                    <p><strong>Email:</strong> {selectedCliente.email}</p>
                                    <p><strong>Fecha Registro:</strong> {selectedCliente.fechaRegistro}</p>
                                    <p><strong>Total Vehículos:</strong> {selectedCliente.vehiculos}</p>
                                </div>
                                <div className="cliente-actions">
                                    <Button variant="secondary" onClick={() => setShowAddVehicle(true)}>
                                        + Registrar Nuevo Vehículo
                                    </Button>
                                    <Button variant="secondary" onClick={() => handleEditCliente(selectedCliente)}>
                                        Editar Información
                                    </Button>
                                </div>
                            </Card>

                            {/* Vehículos Asociados */}
                            <Card title="Vehículos Asociados" className="vehiculos-card">
                                {getVehiculosByCliente(selectedCliente.id).length === 0 ? (
                                    <p className="no-vehiculos">No hay vehículos registrados para este cliente</p>
                                ) : (
                                    <div className="vehiculos-list">
                                        {getVehiculosByCliente(selectedCliente.id).map(vehiculo => (
                                            <div key={vehiculo.id} className="vehiculo-item">
                                                <div className="vehiculo-header">
                                                    <span className="vehiculo-marca">{vehiculo.marca}</span>
                                                    <span className="vehiculo-modelo">{vehiculo.modelo}</span>
                                                </div>
                                                <div className="vehiculo-details">
                                                    <p><strong>Placa:</strong> {vehiculo.placa}</p>
                                                    <p><strong>Color:</strong> {vehiculo.color}</p>
                                                </div>
                                                <div className="vehiculo-actions">
                                                    <button className="icon-btn edit-btn">✏️</button>
                                                    <button className="icon-btn delete-btn">🗑️</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para Registrar Nuevo Vehículo */}
            {showAddVehicle && selectedCliente && (
                <div className="modal-overlay" onClick={() => setShowAddVehicle(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Registrar Nuevo Vehículo</h3>

                        <div className="form-group">
                            <label>CLIENTE PROPIETARIO</label>
                            <Input
                                type="text"
                                value={selectedCliente.nombre}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>PLACA *</label>
                            <Input
                                type="text"
                                name="placa"
                                value={nuevoVehiculo.placa}
                                onChange={(e) => handleInputChange(e, setNuevoVehiculo, nuevoVehiculo)}
                                placeholder="ABC-1234"
                                error={errors.placa}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>MODELO *</label>
                                <Input
                                    type="text"
                                    name="modelo"
                                    value={nuevoVehiculo.modelo}
                                    onChange={(e) => handleInputChange(e, setNuevoVehiculo, nuevoVehiculo)}
                                    placeholder="Hilux"
                                    error={errors.modelo}
                                />
                            </div>
                            <div className="form-group">
                                <label>MARCA *</label>
                                <Input
                                    type="text"
                                    name="marca"
                                    value={nuevoVehiculo.marca}
                                    onChange={(e) => handleInputChange(e, setNuevoVehiculo, nuevoVehiculo)}
                                    placeholder="Toyota"
                                    error={errors.marca}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>COLOR *</label>
                            <Input
                                type="text"
                                name="color"
                                value={nuevoVehiculo.color}
                                onChange={(e) => handleInputChange(e, setNuevoVehiculo, nuevoVehiculo)}
                                placeholder="Blanco"
                                error={errors.color}
                            />
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setShowAddVehicle(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleAddVehiculo}>
                                Guardar Vehículo
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Registrar Nuevo Cliente */}
            {showAddCliente && (
                <div className="modal-overlay" onClick={() => setShowAddCliente(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Registrar Nuevo Cliente</h3>

                        <div className="form-group">
                            <label>NOMBRE COMPLETO *</label>
                            <Input
                                type="text"
                                name="nombre"
                                value={nuevoCliente.nombre}
                                onChange={(e) => handleInputChange(e, setNuevoCliente, nuevoCliente)}
                                placeholder="Juan Pérez"
                                error={errors.nombre}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>TELÉFONO *</label>
                                <Input
                                    type="text"
                                    name="telefono"
                                    value={nuevoCliente.telefono}
                                    onChange={(e) => handleInputChange(e, setNuevoCliente, nuevoCliente)}
                                    placeholder="555-0123"
                                    error={errors.telefono}
                                />
                            </div>
                            <div className="form-group">
                                <label>EMAIL *</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={nuevoCliente.email}
                                    onChange={(e) => handleInputChange(e, setNuevoCliente, nuevoCliente)}
                                    placeholder="juan.perez@email.com"
                                    error={errors.email}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>DIRECCIÓN</label>
                            <Input
                                type="text"
                                name="direccion"
                                value={nuevoCliente.direccion}
                                onChange={(e) => handleInputChange(e, setNuevoCliente, nuevoCliente)}
                                placeholder="Calle Principal #123"
                            />
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setShowAddCliente(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleAddCliente}>
                                Guardar Cliente
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Clientes