import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import Table from '../common/Table'
import './Usuarios.css'

// Interfaces
interface Usuario {
    id: number
    username: string
    nombre: string
    email: string
    rol: 'admin' | 'supervisor' | 'operativo' | 'cajero'
    telefono: string
    estado: 'activo' | 'inactivo' | 'suspendido'
    fechaRegistro: string
    ultimoAcceso?: string
    avatar?: string
}

interface Rol {
    id: string
    nombre: string
    descripcion: string
    permisos: string[]
    color: string
}

interface Permiso {
    id: string
    nombre: string
    modulo: string
    descripcion: string
}

// Datos de ejemplo
const rolesData: Rol[] = [
    {
        id: 'admin',
        nombre: 'Administrador',
        descripcion: 'Acceso total al sistema',
        permisos: ['todos'],
        color: '#ef4444'
    },
    {
        id: 'supervisor',
        nombre: 'Supervisor',
        descripcion: 'Gestión completa excepto usuarios',
        permisos: ['ver_reportes', 'gestion_servicios', 'gestion_inventario', 'gestion_clientes'],
        color: '#f59e0b'
    },
    {
        id: 'operativo',
        nombre: 'Operativo',
        descripcion: 'Registro de servicios y clientes',
        permisos: ['registrar_servicios', 'ver_clientes', 'ver_vehiculos'],
        color: '#10b981'
    },
    {
        id: 'cajero',
        nombre: 'Cajero',
        descripcion: 'Cobros y facturación',
        permisos: ['ver_servicios', 'realizar_cobros', 'ver_reportes'],
        color: '#3b82f6'
    }
]

const permisosData: Permiso[] = [
    { id: 'ver_dashboard', nombre: 'Ver Dashboard', modulo: 'Dashboard', descripcion: 'Acceso al panel principal' },
    { id: 'ver_reportes', nombre: 'Ver Reportes', modulo: 'Reportes', descripcion: 'Visualizar reportes' },
    { id: 'exportar_reportes', nombre: 'Exportar Reportes', modulo: 'Reportes', descripcion: 'Exportar a PDF/Excel' },
    { id: 'gestion_clientes', nombre: 'Gestionar Clientes', modulo: 'Clientes', descripcion: 'CRUD de clientes' },
    { id: 'ver_clientes', nombre: 'Ver Clientes', modulo: 'Clientes', descripcion: 'Visualizar clientes' },
    { id: 'gestion_vehiculos', nombre: 'Gestionar Vehículos', modulo: 'Vehículos', descripcion: 'CRUD de vehículos' },
    { id: 'ver_vehiculos', nombre: 'Ver Vehículos', modulo: 'Vehículos', descripcion: 'Visualizar vehículos' },
    { id: 'gestion_servicios', nombre: 'Gestionar Servicios', modulo: 'Servicios', descripcion: 'CRUD de servicios' },
    { id: 'registrar_servicios', nombre: 'Registrar Servicios', modulo: 'Servicios', descripcion: 'Registrar nuevos servicios' },
    { id: 'ver_servicios', nombre: 'Ver Servicios', modulo: 'Servicios', descripcion: 'Visualizar historial' },
    { id: 'gestion_inventario', nombre: 'Gestionar Inventario', modulo: 'Inventario', descripcion: 'CRUD de productos' },
    { id: 'ver_inventario', nombre: 'Ver Inventario', modulo: 'Inventario', descripcion: 'Visualizar inventario' },
    { id: 'realizar_cobros', nombre: 'Realizar Cobros', modulo: 'Caja', descripcion: 'Procesar pagos' },
    { id: 'gestion_usuarios', nombre: 'Gestionar Usuarios', modulo: 'Usuarios', descripcion: 'CRUD de usuarios' },
    { id: 'ver_usuarios', nombre: 'Ver Usuarios', modulo: 'Usuarios', descripcion: 'Visualizar usuarios' },
    { id: 'configuracion', nombre: 'Configuración', modulo: 'Sistema', descripcion: 'Configuración del sistema' }
]

const usuariosData: Usuario[] = [
    {
        id: 1,
        username: 'admin',
        nombre: 'Administrador',
        email: 'admin@autolavado.com',
        rol: 'admin',
        telefono: '555-0001',
        estado: 'activo',
        fechaRegistro: '2024-01-01',
        ultimoAcceso: '2024-01-15 08:30 AM'
    },
    {
        id: 2,
        username: 'carlos.ruiz',
        nombre: 'Carlos Ruiz',
        email: 'carlos.ruiz@autolavado.com',
        rol: 'operativo',
        telefono: '555-0101',
        estado: 'activo',
        fechaRegistro: '2024-01-02',
        ultimoAcceso: '2024-01-15 09:15 AM'
    },
    {
        id: 3,
        username: 'juan.perez',
        nombre: 'Juan Pérez',
        email: 'juan.perez@autolavado.com',
        rol: 'operativo',
        telefono: '555-0102',
        estado: 'activo',
        fechaRegistro: '2024-01-03',
        ultimoAcceso: '2024-01-14 04:20 PM'
    },
    {
        id: 4,
        username: 'maria.sanchez',
        nombre: 'María Sánchez',
        email: 'maria.sanchez@autolavado.com',
        rol: 'cajero',
        telefono: '555-0201',
        estado: 'activo',
        fechaRegistro: '2024-01-05',
        ultimoAcceso: '2024-01-15 10:45 AM'
    },
    {
        id: 5,
        username: 'luis.mendoza',
        nombre: 'Luis Mendoza',
        email: 'luis.mendoza@autolavado.com',
        rol: 'supervisor',
        telefono: '555-0301',
        estado: 'activo',
        fechaRegistro: '2024-01-08',
        ultimoAcceso: '2024-01-15 11:00 AM'
    },
    {
        id: 6,
        username: 'ana.martinez',
        nombre: 'Ana Martínez',
        email: 'ana.martinez@autolavado.com',
        rol: 'operativo',
        telefono: '555-0103',
        estado: 'inactivo',
        fechaRegistro: '2024-01-10',
        ultimoAcceso: '2024-01-12 02:30 PM'
    },
    {
        id: 7,
        username: 'pedro.ramirez',
        nombre: 'Pedro Ramírez',
        email: 'pedro.ramirez@autolavado.com',
        rol: 'cajero',
        telefono: '555-0202',
        estado: 'suspendido',
        fechaRegistro: '2024-01-12',
        ultimoAcceso: '2024-01-13 01:15 PM'
    }
]

interface UsuariosProps {
    onNavigate?: (path: string) => void
}

const Usuarios = ({ onNavigate }: UsuariosProps) => {
    const navigate = useNavigate()

    // Estados
    const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosData)
    const [roles] = useState<Rol[]>(rolesData)
    const [permisos] = useState<Permiso[]>(permisosData)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRol, setSelectedRol] = useState('todos')
    const [selectedEstado, setSelectedEstado] = useState('todos')
    const [showAddUser, setShowAddUser] = useState(false)
    const [showEditUser, setShowEditUser] = useState<Usuario | null>(null)
    const [showPermissions, setShowPermissions] = useState<Usuario | null>(null)
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
    const [showPasswordModal, setShowPasswordModal] = useState<Usuario | null>(null)

    // Estado para nuevo usuario
    const [nuevoUsuario, setNuevoUsuario] = useState({
        username: '',
        nombre: '',
        email: '',
        rol: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState<any>({})

    // Estadísticas
    const totalUsuarios = usuarios.length
    const usuariosActivos = usuarios.filter(u => u.estado === 'activo').length
    const usuariosInactivos = usuarios.filter(u => u.estado === 'inactivo').length
    const usuariosSuspendidos = usuarios.filter(u => u.estado === 'suspendido').length

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(usuario => {
        const matchesSearch = usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRol = selectedRol === 'todos' || usuario.rol === selectedRol
        const matchesEstado = selectedEstado === 'todos' || usuario.estado === selectedEstado
        return matchesSearch && matchesRol && matchesEstado
    })

    // Columnas para la tabla
    const columns = [
        { key: 'nombre', label: 'NOMBRE' },
        { key: 'username', label: 'USUARIO' },
        { key: 'email', label: 'EMAIL' },
        {
            key: 'rol',
            label: 'ROL',
            render: (value: string) => {
                const rol = roles.find(r => r.id === value)
                return (
                    <span className="rol-badge" style={{ backgroundColor: rol?.color || '#6b7280' }}>
                        {rol?.nombre || value}
                    </span>
                )
            }
        },
        { key: 'telefono', label: 'TELÉFONO' },
        {
            key: 'estado',
            label: 'ESTADO',
            render: (value: string) => (
                <span className={`estado-badge-user ${value}`}>
                    {value === 'activo' ? 'Activo' : value === 'inactivo' ? 'Inactivo' : 'Suspendido'}
                </span>
            )
        },
        {
            key: 'acciones',
            label: 'ACCIONES',
            render: (_: any, row: Usuario) => (
                <div className="action-buttons">
                    <button
                        className="icon-btn view-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(row)
                        }}
                        title="Ver detalles"
                    >
                        👁️
                    </button>
                    <button
                        className="icon-btn key-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowPasswordModal(row)
                        }}
                        title="Cambiar contraseña"
                    >
                        🔑
                    </button>
                    <button
                        className="icon-btn lock-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleToggleEstado(row)
                        }}
                        title={row.estado === 'activo' ? 'Suspender' : 'Activar'}
                    >
                        {row.estado === 'activo' ? '🔒' : '🔓'}
                    </button>
                    <button
                        className="icon-btn edit-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEditUser(row)
                        }}
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        className="icon-btn delete-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteUser(row.id)
                        }}
                        title="Eliminar"
                        disabled={row.username === 'admin'}
                    >
                        🗑️
                    </button>
                </div>
            )
        }
    ]

    const handleEditUser = (usuario: Usuario) => {
        setShowEditUser(usuario)
        setNuevoUsuario({
            username: usuario.username,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            telefono: usuario.telefono,
            password: '',
            confirmPassword: ''
        })
    }

    const handleDeleteUser = (id: number) => {
        const usuario = usuarios.find(u => u.id === id)
        if (usuario?.username === 'admin') {
            alert('No se puede eliminar el usuario administrador')
            return
        }
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            setUsuarios(usuarios.filter(u => u.id !== id))
            if (selectedUser?.id === id) setSelectedUser(null)
        }
    }

    const handleToggleEstado = (usuario: Usuario) => {
        if (usuario.username === 'admin') {
            alert('No se puede cambiar el estado del usuario administrador')
            return
        }
        const nuevoEstado = usuario.estado === 'activo' ? 'inactivo' : 'activo'
        setUsuarios(usuarios.map(u =>
            u.id === usuario.id
                ? { ...u, estado: nuevoEstado as any }
                : u
        ))
    }

    const handleAddUser = () => {
        // Validaciones
        const newErrors: any = {}
        if (!nuevoUsuario.username) newErrors.username = 'El nombre de usuario es requerido'
        if (!nuevoUsuario.nombre) newErrors.nombre = 'El nombre completo es requerido'
        if (!nuevoUsuario.email) newErrors.email = 'El email es requerido'
        else if (!/\S+@\S+\.\S+/.test(nuevoUsuario.email)) newErrors.email = 'Email inválido'
        if (!nuevoUsuario.rol) newErrors.rol = 'El rol es requerido'
        if (!showEditUser) {
            if (!nuevoUsuario.password) newErrors.password = 'La contraseña es requerida'
            else if (nuevoUsuario.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
            if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Verificar username único
        const usernameExiste = usuarios.some(u => u.username === nuevoUsuario.username &&
            (!showEditUser || u.id !== showEditUser?.id))
        if (usernameExiste) {
            setErrors({ username: 'Este nombre de usuario ya existe' })
            return
        }

        // Verificar email único
        const emailExiste = usuarios.some(u => u.email === nuevoUsuario.email &&
            (!showEditUser || u.id !== showEditUser?.id))
        if (emailExiste) {
            setErrors({ email: 'Este email ya está registrado' })
            return
        }

        if (showEditUser) {
            // Editar usuario existente
            setUsuarios(usuarios.map(u =>
                u.id === showEditUser.id
                    ? {
                        ...u,
                        username: nuevoUsuario.username,
                        nombre: nuevoUsuario.nombre,
                        email: nuevoUsuario.email,
                        rol: nuevoUsuario.rol as any,
                        telefono: nuevoUsuario.telefono
                    }
                    : u
            ))
            alert('Usuario actualizado exitosamente')
        } else {
            // Crear nuevo usuario
            const newUser: Usuario = {
                id: usuarios.length + 1,
                username: nuevoUsuario.username,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol as any,
                telefono: nuevoUsuario.telefono,
                estado: 'activo',
                fechaRegistro: new Date().toISOString().split('T')[0]
            }
            setUsuarios([...usuarios, newUser])
            alert('Usuario creado exitosamente')
        }

        resetForm()
    }

    const handleChangePassword = () => {
        if (!showPasswordModal) return

        if (!nuevoUsuario.password) {
            setErrors({ password: 'La contraseña es requerida' })
            return
        }
        if (nuevoUsuario.password.length < 6) {
            setErrors({ password: 'La contraseña debe tener al menos 6 caracteres' })
            return
        }
        if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
            setErrors({ confirmPassword: 'Las contraseñas no coinciden' })
            return
        }

        alert(`Contraseña actualizada para ${showPasswordModal.nombre}`)
        setShowPasswordModal(null)
        setNuevoUsuario({ ...nuevoUsuario, password: '', confirmPassword: '' })
        setErrors({})
    }

    const resetForm = () => {
        setNuevoUsuario({
            username: '',
            nombre: '',
            email: '',
            rol: '',
            telefono: '',
            password: '',
            confirmPassword: ''
        })
        setErrors({})
        setShowAddUser(false)
        setShowEditUser(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNuevoUsuario(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const getRolColor = (rolId: string) => {
        const rol = roles.find(r => r.id === rolId)
        return rol?.color || '#6b7280'
    }

    const getPermisosPorRol = (rolId: string) => {
        const rol = roles.find(r => r.id === rolId)
        if (!rol) return []
        if (rol.permisos[0] === 'todos') return permisos
        return permisos.filter(p => rol.permisos.includes(p.id))
    }

    return (
        <div className="usuarios-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gestión de Usuarios</h1>
                    <p className="page-subtitle">Control de accesos, roles y permisos</p>
                </div>
                <Button variant="primary" onClick={() => setShowAddUser(true)}>
                    + Nuevo Usuario
                </Button>
            </div>

            <div className="usuarios-content">
                {/* Tarjetas de Estadísticas */}
                <div className="stats-grid">
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">👥</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Total Usuarios</p>
                            <p className="stat-value-mini">{totalUsuarios}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">🟢</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Activos</p>
                            <p className="stat-value-mini">{usuariosActivos}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">🔴</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Inactivos</p>
                            <p className="stat-value-mini">{usuariosInactivos}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">⚠️</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Suspendidos</p>
                            <p className="stat-value-mini">{usuariosSuspendidos}</p>
                        </div>
                    </div>
                </div>

                {/* Lista de Usuarios */}
                <Card className="usuarios-card">
                    <div className="usuarios-header">
                        <div className="filters">
                            <div className="search-wrapper">
                                <Input
                                    type="text"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por nombre, usuario o email..."
                                />
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedRol}
                                    onChange={(e) => setSelectedRol(e.target.value)}
                                >
                                    <option value="todos">Todos los roles</option>
                                    {roles.map(rol => (
                                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedEstado}
                                    onChange={(e) => setSelectedEstado(e.target.value)}
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="activo">Activos</option>
                                    <option value="inactivo">Inactivos</option>
                                    <option value="suspendido">Suspendidos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        data={usuariosFiltrados}
                    />

                    <div className="table-footer">
                        <span>Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios</span>
                    </div>
                </Card>
            </div>

            {/* Modal para Detalles del Usuario */}
            {selectedUser && (
                <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalles del Usuario</h3>
                        <div className="user-details-modal">
                            <div className="detail-row">
                                <strong>Nombre:</strong> {selectedUser.nombre}
                            </div>
                            <div className="detail-row">
                                <strong>Usuario:</strong> {selectedUser.username}
                            </div>
                            <div className="detail-row">
                                <strong>Email:</strong> {selectedUser.email}
                            </div>
                            <div className="detail-row">
                                <strong>Teléfono:</strong> {selectedUser.telefono}
                            </div>
                            <div className="detail-row">
                                <strong>Rol:</strong>
                                <span className="rol-badge" style={{ backgroundColor: getRolColor(selectedUser.rol) }}>
                                    {roles.find(r => r.id === selectedUser.rol)?.nombre}
                                </span>
                            </div>
                            <div className="detail-row">
                                <strong>Estado:</strong>
                                <span className={`estado-badge-user ${selectedUser.estado}`}>
                                    {selectedUser.estado === 'activo' ? 'Activo' : selectedUser.estado === 'inactivo' ? 'Inactivo' : 'Suspendido'}
                                </span>
                            </div>
                            <div className="detail-row">
                                <strong>Fecha Registro:</strong> {selectedUser.fechaRegistro}
                            </div>
                            {selectedUser.ultimoAcceso && (
                                <div className="detail-row">
                                    <strong>Último Acceso:</strong> {selectedUser.ultimoAcceso}
                                </div>
                            )}
                        </div>
                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => {
                                handleEditUser(selectedUser)
                                setSelectedUser(null)
                            }}>
                                Editar Usuario
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Agregar/Editar Usuario */}
            {(showAddUser || showEditUser) && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>{showEditUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nombre de Usuario *</label>
                                <Input
                                    type="text"
                                    name="username"
                                    value={nuevoUsuario.username}
                                    onChange={handleInputChange}
                                    placeholder="ej: juan.perez"
                                    error={errors.username}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nombre Completo *</label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    value={nuevoUsuario.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Juan Pérez"
                                    error={errors.nombre}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={nuevoUsuario.email}
                                    onChange={handleInputChange}
                                    placeholder="juan@autolavado.com"
                                    error={errors.email}
                                />
                            </div>

                            <div className="form-group">
                                <label>Teléfono</label>
                                <Input
                                    type="text"
                                    name="telefono"
                                    value={nuevoUsuario.telefono}
                                    onChange={handleInputChange}
                                    placeholder="555-0123"
                                />
                            </div>

                            <div className="form-group">
                                <label>Rol *</label>
                                <select
                                    name="rol"
                                    className="select-field"
                                    value={nuevoUsuario.rol}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione un rol</option>
                                    {roles.map(rol => (
                                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                    ))}
                                </select>
                                {errors.rol && <span className="error-text">{errors.rol}</span>}
                            </div>

                            {!showEditUser && (
                                <>
                                    <div className="form-group">
                                        <label>Contraseña *</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={nuevoUsuario.password}
                                            onChange={handleInputChange}
                                            placeholder="Mínimo 6 caracteres"
                                            error={errors.password}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Confirmar Contraseña *</label>
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            value={nuevoUsuario.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Repite la contraseña"
                                            error={errors.confirmPassword}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleAddUser}>
                                {showEditUser ? 'Actualizar Usuario' : 'Crear Usuario'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Cambiar Contraseña */}
            {showPasswordModal && (
                <div className="modal-overlay" onClick={() => setShowPasswordModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Cambiar Contraseña</h3>
                        <p className="modal-subtitle">Usuario: <strong>{showPasswordModal.nombre}</strong></p>

                        <div className="form-group">
                            <label>Nueva Contraseña *</label>
                            <Input
                                type="password"
                                name="password"
                                value={nuevoUsuario.password}
                                onChange={handleInputChange}
                                placeholder="Mínimo 6 caracteres"
                                error={errors.password}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirmar Contraseña *</label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={nuevoUsuario.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Repite la contraseña"
                                error={errors.confirmPassword}
                            />
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => {
                                setShowPasswordModal(null)
                                setNuevoUsuario({ ...nuevoUsuario, password: '', confirmPassword: '' })
                                setErrors({})
                            }}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleChangePassword}>
                                Cambiar Contraseña
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Usuarios