import { useState, useEffec } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import './Configuracion.css'

// Interfaces
interface ConfiguracionGeneral {
    nombreEmpresa: string
    nit: string
    telefono: string
    email: string
    direccion: string
    sitioWeb: string
    horarioApertura: string
    horarioCierre: string
    diasLaborales: string[]
    moneda: string
    impuesto: number
}

interface ConfiguracionServicios {
    tiempoEstimadoLavado: number
    tiempoEstimadoPremium: number
    tiempoEstimadoMotor: number
    tiempoEstimadoTapiceria: number
    lavadosSimultaneos: number
    requiereAprobacion: boolean
    notificarCliente: boolean
}

interface ConfiguracionNotificaciones {
    emailNotificaciones: boolean
    emailAlertaStock: boolean
    emailReporteDiario: boolean
    emailReporteSemanal: boolean
    smsNotificaciones: boolean
    smsAlertaServicio: boolean
    whatsappNotificaciones: boolean
}

interface ConfiguracionSeguridad {
    sesionExpiracion: number
    intentosFallidos: number
    bloqueoMinutos: number
    requiere2FA: boolean
    passwordExpira: number
    historialPasswords: number
}

interface Backup {
    id: number
    fecha: string
    tamano: string
    tipo: 'automatico' | 'manual'
    estado: 'completado' | 'fallido' | 'en_proceso'
}

// Datos de ejemplo
const configGeneralData: ConfiguracionGeneral = {
    nombreEmpresa: 'AutoWash Pro',
    nit: '901234567-1',
    telefono: '555-0123',
    email: 'info@autowashpro.com',
    direccion: 'Calle Principal #123, Centro',
    sitioWeb: 'www.autowashpro.com',
    horarioApertura: '08:00',
    horarioCierre: '20:00',
    diasLaborales: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    moneda: 'COP',
    impuesto: 19
}

const configServiciosData: ConfiguracionServicios = {
    tiempoEstimadoLavado: 30,
    tiempoEstimadoPremium: 60,
    tiempoEstimadoMotor: 45,
    tiempoEstimadoTapiceria: 40,
    lavadosSimultaneos: 3,
    requiereAprobacion: false,
    notificarCliente: true
}

const configNotificacionesData: ConfiguracionNotificaciones = {
    emailNotificaciones: true,
    emailAlertaStock: true,
    emailReporteDiario: false,
    emailReporteSemanal: true,
    smsNotificaciones: false,
    smsAlertaServicio: true,
    whatsappNotificaciones: true
}

const configSeguridadData: ConfiguracionSeguridad = {
    sesionExpiracion: 60,
    intentosFallidos: 5,
    bloqueoMinutos: 30,
    requiere2FA: false,
    passwordExpira: 90,
    historialPasswords: 5
}

const backupsData: Backup[] = [
    { id: 1, fecha: '2024-01-15 02:00 AM', tamano: '245 MB', tipo: 'automatico', estado: 'completado' },
    { id: 2, fecha: '2024-01-14 02:00 AM', tamano: '238 MB', tipo: 'automatico', estado: 'completado' },
    { id: 3, fecha: '2024-01-13 02:00 AM', tamano: '241 MB', tipo: 'automatico', estado: 'completado' },
    { id: 4, fecha: '2024-01-12 03:15 PM', tamano: '235 MB', tipo: 'manual', estado: 'completado' },
    { id: 5, fecha: '2024-01-11 02:00 AM', tamano: '230 MB', tipo: 'automatico', estado: 'fallido' }
]

interface ConfiguracionProps {
    onNavigate?: (path: string) => void
}

const Configuracion = ({ onNavigate }: ConfiguracionProps) => {
    const navigate = useNavigate()

    // Estados
    const [activeTab, setActiveTab] = useState<'general' | 'servicios' | 'notificaciones' | 'seguridad' | 'backup'>('general')
    const [configGeneral, setConfigGeneral] = useState<ConfiguracionGeneral>(configGeneralData)
    const [configServicios, setConfigServicios] = useState<ConfiguracionServicios>(configServiciosData)
    const [configNotificaciones, setConfigNotificaciones] = useState<ConfiguracionNotificaciones>(configNotificacionesData)
    const [configSeguridad, setConfigSeguridad] = useState<ConfiguracionSeguridad>(configSeguridadData)
    const [backups, setBackups] = useState<Backup[]>(backupsData)
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showBackupModal, setShowBackupModal] = useState(false)

    const handleSaveGeneral = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
            alert('Configuración guardada exitosamente')
        }, 1000)
    }

    const handleSaveServicios = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
            alert('Configuración de servicios guardada exitosamente')
        }, 1000)
    }

    const handleSaveNotificaciones = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
            alert('Configuración de notificaciones guardada exitosamente')
        }, 1000)
    }

    const handleSaveSeguridad = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
            alert('Configuración de seguridad guardada exitosamente')
        }, 1000)
    }

    const handleRealizarBackup = () => {
        const newBackup: Backup = {
            id: backups.length + 1,
            fecha: new Date().toLocaleString(),
            tamano: `${Math.floor(Math.random() * 100) + 200} MB`,
            tipo: 'manual',
            estado: 'en_proceso'
        }
        setBackups([newBackup, ...backups])
        setShowBackupModal(false)

        setTimeout(() => {
            setBackups(backups.map(b =>
                b.id === newBackup.id
                    ? { ...b, estado: 'completado' }
                    : b
            ))
            alert('Backup realizado exitosamente')
        }, 2000)
    }

    const handleRestaurarBackup = (backup: Backup) => {
        if (confirm(`¿Estás seguro de restaurar el backup del ${backup.fecha}?\nEsta acción sobrescribirá los datos actuales.`)) {
            alert('Restaurando backup...')
            setTimeout(() => {
                alert('Backup restaurado exitosamente')
            }, 2000)
        }
    }

    const handleEliminarBackup = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este backup?')) {
            setBackups(backups.filter(b => b.id !== id))
        }
    }

    const handleLimpiarCache = () => {
        if (confirm('¿Estás seguro de limpiar la caché del sistema?')) {
            alert('Caché limpiada exitosamente')
        }
    }

    const handleReiniciarSistema = () => {
        if (confirm('¿Estás seguro de reiniciar el sistema?\nEsta acción puede tomar unos minutos.')) {
            alert('Reiniciando sistema...')
        }
    }

    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

    return (
        <div className="configuracion-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Configuración</h1>
                    <p className="page-subtitle">Configuración general del sistema</p>
                </div>
            </div>

            <div className="configuracion-content">
                {/* Tabs */}
                <div className="config-tabs">
                    <button
                        className={`config-tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        ⚙️ General
                    </button>
                    <button
                        className={`config-tab ${activeTab === 'servicios' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servicios')}
                    >
                        🧼 Servicios
                    </button>
                    <button
                        className={`config-tab ${activeTab === 'notificaciones' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notificaciones')}
                    >
                        📧 Notificaciones
                    </button>
                    <button
                        className={`config-tab ${activeTab === 'seguridad' ? 'active' : ''}`}
                        onClick={() => setActiveTab('seguridad')}
                    >
                        🔒 Seguridad
                    </button>
                    <button
                        className={`config-tab ${activeTab === 'backup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('backup')}
                    >
                        💾 Backup
                    </button>
                </div>

                {/* Configuración General */}
                {activeTab === 'general' && (
                    <Card className="config-card">
                        <h3 className="config-title">Información de la Empresa</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nombre de la Empresa</label>
                                <Input
                                    type="text"
                                    value={configGeneral.nombreEmpresa}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, nombreEmpresa: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>NIT / RUT</label>
                                <Input
                                    type="text"
                                    value={configGeneral.nit}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, nit: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <Input
                                    type="text"
                                    value={configGeneral.telefono}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, telefono: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <Input
                                    type="email"
                                    value={configGeneral.email}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Dirección</label>
                                <Input
                                    type="text"
                                    value={configGeneral.direccion}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, direccion: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Sitio Web</label>
                                <Input
                                    type="text"
                                    value={configGeneral.sitioWeb}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, sitioWeb: e.target.value })}
                                />
                            </div>
                        </div>

                        <h3 className="config-title">Horario de Atención</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Hora de Apertura</label>
                                <Input
                                    type="time"
                                    value={configGeneral.horarioApertura}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, horarioApertura: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Hora de Cierre</label>
                                <Input
                                    type="time"
                                    value={configGeneral.horarioCierre}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, horarioCierre: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Días Laborales</label>
                                <div className="dias-laborales">
                                    {diasSemana.map(dia => (
                                        <label key={dia} className="dia-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={configGeneral.diasLaborales.includes(dia)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setConfigGeneral({
                                                            ...configGeneral,
                                                            diasLaborales: [...configGeneral.diasLaborales, dia]
                                                        })
                                                    } else {
                                                        setConfigGeneral({
                                                            ...configGeneral,
                                                            diasLaborales: configGeneral.diasLaborales.filter(d => d !== dia)
                                                        })
                                                    }
                                                }}
                                            />
                                            {dia}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <h3 className="config-title">Configuración Fiscal</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Moneda</label>
                                <select
                                    className="select-field"
                                    value={configGeneral.moneda}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, moneda: e.target.value })}
                                >
                                    <option value="COP">COP - Peso Colombiano</option>
                                    <option value="USD">USD - Dólar Americano</option>
                                    <option value="MXN">MXN - Peso Mexicano</option>
                                    <option value="EUR">EUR - Euro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Impuesto (%)</label>
                                <Input
                                    type="number"
                                    value={configGeneral.impuesto}
                                    onChange={(e) => setConfigGeneral({ ...configGeneral, impuesto: parseFloat(e.target.value) })}
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button
                                variant="primary"
                                onClick={handleSaveGeneral}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Configuración de Servicios */}
                {activeTab === 'servicios' && (
                    <Card className="config-card">
                        <h3 className="config-title">Tiempos Estimados (minutos)</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Lavado Exterior</label>
                                <Input
                                    type="number"
                                    value={configServicios.tiempoEstimadoLavado}
                                    onChange={(e) => setConfigServicios({ ...configServicios, tiempoEstimadoLavado: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lavado Premium</label>
                                <Input
                                    type="number"
                                    value={configServicios.tiempoEstimadoPremium}
                                    onChange={(e) => setConfigServicios({ ...configServicios, tiempoEstimadoPremium: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Motor & Chassis</label>
                                <Input
                                    type="number"
                                    value={configServicios.tiempoEstimadoMotor}
                                    onChange={(e) => setConfigServicios({ ...configServicios, tiempoEstimadoMotor: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Limpieza Tapicería</label>
                                <Input
                                    type="number"
                                    value={configServicios.tiempoEstimadoTapiceria}
                                    onChange={(e) => setConfigServicios({ ...configServicios, tiempoEstimadoTapiceria: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lavados Simultáneos Máximos</label>
                                <Input
                                    type="number"
                                    value={configServicios.lavadosSimultaneos}
                                    onChange={(e) => setConfigServicios({ ...configServicios, lavadosSimultaneos: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <h3 className="config-title">Opciones Adicionales</h3>
                        <div className="opciones-grid">
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configServicios.requiereAprobacion}
                                    onChange={(e) => setConfigServicios({ ...configServicios, requiereAprobacion: e.target.checked })}
                                />
                                Requiere aprobación para servicios especiales
                            </label>
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configServicios.notificarCliente}
                                    onChange={(e) => setConfigServicios({ ...configServicios, notificarCliente: e.target.checked })}
                                />
                                Notificar al cliente cuando el servicio está listo
                            </label>
                        </div>

                        <div className="form-actions">
                            <Button variant="primary" onClick={handleSaveServicios}>
                                Guardar Cambios
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Configuración de Notificaciones */}
                {activeTab === 'notificaciones' && (
                    <Card className="config-card">
                        <h3 className="config-title">Notificaciones por Email</h3>
                        <div className="opciones-grid">
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.emailNotificaciones}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, emailNotificaciones: e.target.checked })}
                                />
                                Activar notificaciones por email
                            </label>
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.emailAlertaStock}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, emailAlertaStock: e.target.checked })}
                                />
                                Alertas de stock bajo
                            </label>
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.emailReporteDiario}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, emailReporteDiario: e.target.checked })}
                                />
                                Reporte diario de ventas
                            </label>
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.emailReporteSemanal}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, emailReporteSemanal: e.target.checked })}
                                />
                                Reporte semanal de actividades
                            </label>
                        </div>

                        <h3 className="config-title">Notificaciones por SMS</h3>
                        <div className="opciones-grid">
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.smsNotificaciones}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, smsNotificaciones: e.target.checked })}
                                />
                                Activar notificaciones por SMS
                            </label>
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.smsAlertaServicio}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, smsAlertaServicio: e.target.checked })}
                                />
                                Alertas de servicio completado
                            </label>
                        </div>

                        <h3 className="config-title">WhatsApp</h3>
                        <div className="opciones-grid">
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configNotificaciones.whatsappNotificaciones}
                                    onChange={(e) => setConfigNotificaciones({ ...configNotificaciones, whatsappNotificaciones: e.target.checked })}
                                />
                                Activar notificaciones por WhatsApp
                            </label>
                        </div>

                        <div className="form-actions">
                            <Button variant="primary" onClick={handleSaveNotificaciones}>
                                Guardar Cambios
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Configuración de Seguridad */}
                {activeTab === 'seguridad' && (
                    <Card className="config-card">
                        <h3 className="config-title">Seguridad de Sesión</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Tiempo de expiración de sesión (minutos)</label>
                                <Input
                                    type="number"
                                    value={configSeguridad.sesionExpiracion}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, sesionExpiracion: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Intentos fallidos permitidos</label>
                                <Input
                                    type="number"
                                    value={configSeguridad.intentosFallidos}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, intentosFallidos: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tiempo de bloqueo (minutos)</label>
                                <Input
                                    type="number"
                                    value={configSeguridad.bloqueoMinutos}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, bloqueoMinutos: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <h3 className="config-title">Políticas de Contraseña</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Expiración de contraseña (días)</label>
                                <Input
                                    type="number"
                                    value={configSeguridad.passwordExpira}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, passwordExpira: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Historial de contraseñas a recordar</label>
                                <Input
                                    type="number"
                                    value={configSeguridad.historialPasswords}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, historialPasswords: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <h3 className="config-title">Autenticación</h3>
                        <div className="opciones-grid">
                            <label className="checkbox-label-config">
                                <input
                                    type="checkbox"
                                    checked={configSeguridad.requiere2FA}
                                    onChange={(e) => setConfigSeguridad({ ...configSeguridad, requiere2FA: e.target.checked })}
                                />
                                Requerir autenticación de dos factores (2FA)
                            </label>
                        </div>

                        <div className="form-actions">
                            <Button variant="primary" onClick={handleSaveSeguridad}>
                                Guardar Cambios
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Configuración de Backup */}
                {activeTab === 'backup' && (
                    <Card className="config-card">
                        <div className="backup-header">
                            <h3 className="config-title">Copias de Seguridad</h3>
                            <Button variant="primary" onClick={() => setShowBackupModal(true)}>
                                + Realizar Backup
                            </Button>
                        </div>

                        <div className="backup-actions">
                            <button className="action-btn-config" onClick={handleLimpiarCache}>
                                🧹 Limpiar Caché
                            </button>
                            <button className="action-btn-config danger" onClick={handleReiniciarSistema}>
                                🔄 Reiniciar Sistema
                            </button>
                        </div>

                        <div className="backup-tabla">
                            <table className="backup-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Tamaño</th>
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {backups.map(backup => (
                                        <tr key={backup.id}>
                                            <td>{backup.fecha}</td>
                                            <td>{backup.tamano}</td>
                                            <td>
                                                <span className={`tipo-badge ${backup.tipo}`}>
                                                    {backup.tipo === 'automatico' ? '🤖 Automático' : '👤 Manual'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`estado-badge-backup ${backup.estado}`}>
                                                    {backup.estado === 'completado' ? '✅ Completado' :
                                                        backup.estado === 'fallido' ? '❌ Fallido' : '⏳ En Proceso'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="backup-actions-buttons">
                                                    <button
                                                        className="icon-btn-backup restore"
                                                        onClick={() => handleRestaurarBackup(backup)}
                                                        disabled={backup.estado !== 'completado'}
                                                    >
                                                        🔄
                                                    </button>
                                                    <button
                                                        className="icon-btn-backup delete"
                                                        onClick={() => handleEliminarBackup(backup.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>

            {/* Modal para Backup */}
            {showBackupModal && (
                <div className="modal-overlay" onClick={() => setShowBackupModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Realizar Backup</h3>
                        <p>¿Deseas realizar una copia de seguridad ahora?</p>
                        <p className="modal-warning">⚠️ El proceso puede tomar algunos minutos</p>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setShowBackupModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleRealizarBackup}>
                                Realizar Backup
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast de éxito */}
            {showSuccess && (
                <div className="toast-success">
                    ✅ Configuración guardada exitosamente
                </div>
            )}
        </div>
    )
}

export default Configuracion