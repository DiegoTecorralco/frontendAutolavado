import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import './Reportes.css'

// Interfaces
interface ReporteServicio {
    id: number
    fecha: string
    hora: string
    cliente: string
    placa: string
    vehiculo: string
    servicio: string
    operativo: string
    subtotal: number
    descuento: number
    total: number
    estado: string
}

interface ReporteVentasDiarias {
    fecha: string
    totalServicios: number
    totalIngresos: number
    promedio: number
}

interface ProductoMasUsado {
    nombre: string
    cantidad: number
    porcentaje: number
}

interface OperativoRendimiento {
    nombre: string
    serviciosRealizados: number
    ingresosGenerados: number
    promedioServicio: number
}

// Datos de ejemplo para reportes
const serviciosData: ReporteServicio[] = [
    { id: 1, fecha: '2024-01-15', hora: '09:45 AM', cliente: 'Ricardo Montaner', placa: 'PBC-5590', vehiculo: 'Toyota Hilux', servicio: 'Lavado Completo', operativo: 'Carlos Ruiz', subtotal: 25.00, descuento: 0, total: 25.00, estado: 'finalizado' },
    { id: 2, fecha: '2024-01-15', hora: '10:15 AM', cliente: 'Mariana Esposito', placa: 'GHY-8821', vehiculo: 'Nissan Versa', servicio: 'Polimerizado', operativo: 'Miguel Sosa', subtotal: 40.00, descuento: 0, total: 40.00, estado: 'finalizado' },
    { id: 3, fecha: '2024-01-15', hora: '10:40 AM', cliente: 'Pedro Capo', placa: 'LMX-0012', vehiculo: 'Ford Focus', servicio: 'Lavado Exterior', operativo: 'Carlos Ruiz', subtotal: 15.00, descuento: 0, total: 15.00, estado: 'finalizado' },
    { id: 4, fecha: '2024-01-15', hora: '11:20 AM', cliente: 'María García', placa: 'XYZ-9876', vehiculo: 'Honda Civic', servicio: 'Lavado Premium', operativo: 'Juan Pérez', subtotal: 35.00, descuento: 5.00, total: 30.00, estado: 'finalizado' },
    { id: 5, fecha: '2024-01-14', hora: '02:30 PM', cliente: 'Carlos López', placa: 'DEF-4567', vehiculo: 'Mazda 3', servicio: 'Motor & Chassis', operativo: 'Luis Suarez', subtotal: 30.00, descuento: 0, total: 30.00, estado: 'finalizado' },
    { id: 6, fecha: '2024-01-14', hora: '03:15 PM', cliente: 'Elena Rose', placa: 'GHI-0012', vehiculo: 'Encaredo', servicio: 'Lavado Premium', operativo: 'Mario Ruiz', subtotal: 35.00, descuento: 0, total: 35.00, estado: 'finalizado' },
    { id: 7, fecha: '2024-01-13', hora: '10:00 AM', cliente: 'Juan Pérez', placa: 'ABC-1234', vehiculo: 'Toyota Corolla', servicio: 'Lavado Exterior', operativo: 'Carlos Ruiz', subtotal: 15.00, descuento: 0, total: 15.00, estado: 'finalizado' },
    { id: 8, fecha: '2024-01-13', hora: '11:30 AM', cliente: 'Ana Martínez', placa: 'JKL-7890', vehiculo: 'Nissan Versa', servicio: 'Limpieza Tapicería', operativo: 'Ana Martinez', subtotal: 20.00, descuento: 2.00, total: 18.00, estado: 'finalizado' },
]

const ventasDiariasData: ReporteVentasDiarias[] = [
    { fecha: '2024-01-08', totalServicios: 18, totalIngresos: 420, promedio: 23.33 },
    { fecha: '2024-01-09', totalServicios: 22, totalIngresos: 485, promedio: 22.05 },
    { fecha: '2024-01-10', totalServicios: 25, totalIngresos: 560, promedio: 22.40 },
    { fecha: '2024-01-11', totalServicios: 20, totalIngresos: 445, promedio: 22.25 },
    { fecha: '2024-01-12', totalServicios: 28, totalIngresos: 635, promedio: 22.68 },
    { fecha: '2024-01-13', totalServicios: 24, totalIngresos: 530, promedio: 22.08 },
    { fecha: '2024-01-14', totalServicios: 30, totalIngresos: 685, promedio: 22.83 },
    { fecha: '2024-01-15', totalServicios: 32, totalIngresos: 725, promedio: 22.66 },
]

const productosMasUsados: ProductoMasUsado[] = [
    { nombre: 'Lavado Exterior', cantidad: 45, porcentaje: 32 },
    { nombre: 'Lavado Premium', cantidad: 28, porcentaje: 20 },
    { nombre: 'Lavado Completo', cantidad: 25, porcentaje: 18 },
    { nombre: 'Motor & Chassis', cantidad: 18, porcentaje: 13 },
    { nombre: 'Limpieza Tapicería', cantidad: 12, porcentaje: 9 },
    { nombre: 'Polimerizado', cantidad: 8, porcentaje: 6 },
    { nombre: 'Otros', cantidad: 4, porcentaje: 2 },
]

const operativosRendimiento: OperativoRendimiento[] = [
    { nombre: 'Carlos Ruiz', serviciosRealizados: 42, ingresosGenerados: 945, promedioServicio: 22.50 },
    { nombre: 'Juan Pérez', serviciosRealizados: 35, ingresosGenerados: 780, promedioServicio: 22.29 },
    { nombre: 'Miguel Sosa', serviciosRealizados: 28, ingresosGenerados: 645, promedioServicio: 23.04 },
    { nombre: 'Luis Suarez', serviciosRealizados: 22, ingresosGenerados: 495, promedioServicio: 22.50 },
    { nombre: 'Ana Martinez', serviciosRealizados: 18, ingresosGenerados: 385, promedioServicio: 21.39 },
]

interface ReportesProps {
    onNavigate?: (path: string) => void
}

const Reportes = ({ onNavigate }: ReportesProps) => {
    const navigate = useNavigate()

    // Estados
    const [reportType, setReportType] = useState<'servicios' | 'ventas' | 'productos' | 'operativos'>('servicios')
    const [fechaInicio, setFechaInicio] = useState('2024-01-01')
    const [fechaFin, setFechaFin] = useState('2024-01-31')
    const [selectedOperativo, setSelectedOperativo] = useState('todos')
    const [selectedServicio, setSelectedServicio] = useState('todos')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    // Filtrar servicios por fecha
    const serviciosFiltrados = serviciosData.filter(servicio => {
        const fechaServicio = new Date(servicio.fecha)
        const inicio = new Date(fechaInicio)
        const fin = new Date(fechaFin)
        const matchesOperativo = selectedOperativo === 'todos' || servicio.operativo === selectedOperativo
        const matchesServicio = selectedServicio === 'todos' || servicio.servicio === selectedServicio
        return fechaServicio >= inicio && fechaServicio <= fin && matchesOperativo && matchesServicio
    })

    // Calcular estadísticas
    const totalServicios = serviciosFiltrados.length
    const totalIngresos = serviciosFiltrados.reduce((sum, s) => sum + s.total, 0)
    const promedioServicio = totalServicios > 0 ? totalIngresos / totalServicios : 0
    const totalDescuentos = serviciosFiltrados.reduce((sum, s) => sum + s.descuento, 0)

    // Obtener operativos únicos para filtro
    const operativosUnicos = [...new Set(serviciosData.map(s => s.operativo))]
    const serviciosUnicos = [...new Set(serviciosData.map(s => s.servicio))]

    const handleGenerarReporte = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setShowPreview(true)
            alert('Reporte generado exitosamente')
        }, 1500)
    }

    const handleExportarPDF = () => {
        console.log('Exportando a PDF...')
        alert('Exportando reporte a PDF...')
    }

    const handleExportarExcel = () => {
        console.log('Exportando a Excel...')
        alert('Exportando reporte a Excel...')
    }

    const handleImprimir = () => {
        window.print()
    }

    const getTipoReporteTitle = () => {
        switch (reportType) {
            case 'servicios': return 'Reporte de Servicios'
            case 'ventas': return 'Reporte de Ventas Diarias'
            case 'productos': return 'Reporte de Productos Más Utilizados'
            case 'operativos': return 'Reporte de Rendimiento por Operativo'
            default: return 'Reporte'
        }
    }

    return (
        <div className="reportes-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Reportes y Estadísticas</h1>
                    <p className="page-subtitle">Análisis detallado del negocio</p>
                </div>
            </div>

            <div className="reportes-content">
                {/* Selector de Tipo de Reporte */}
                <div className="report-tabs">
                    <button
                        className={`report-tab ${reportType === 'servicios' ? 'active' : ''}`}
                        onClick={() => setReportType('servicios')}
                    >
                        📋 Servicios
                    </button>
                    <button
                        className={`report-tab ${reportType === 'ventas' ? 'active' : ''}`}
                        onClick={() => setReportType('ventas')}
                    >
                        📊 Ventas Diarias
                    </button>
                    <button
                        className={`report-tab ${reportType === 'productos' ? 'active' : ''}`}
                        onClick={() => setReportType('productos')}
                    >
                        🏆 Productos Populares
                    </button>
                    <button
                        className={`report-tab ${reportType === 'operativos' ? 'active' : ''}`}
                        onClick={() => setReportType('operativos')}
                    >
                        👥 Rendimiento Operativos
                    </button>
                </div>

                {/* Filtros */}
                <Card className="filtros-card">
                    <h3 className="filtros-title">Filtros de Reporte</h3>
                    <div className="filtros-grid">
                        <div className="form-group">
                            <label>Fecha Inicio</label>
                            <Input
                                type="date"
                                name="fechaInicio"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha Fin</label>
                            <Input
                                type="date"
                                name="fechaFin"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Operativo</label>
                            <select
                                className="select-field"
                                value={selectedOperativo}
                                onChange={(e) => setSelectedOperativo(e.target.value)}
                            >
                                <option value="todos">Todos</option>
                                {operativosUnicos.map(op => (
                                    <option key={op} value={op}>{op}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tipo Servicio</label>
                            <select
                                className="select-field"
                                value={selectedServicio}
                                onChange={(e) => setSelectedServicio(e.target.value)}
                            >
                                <option value="todos">Todos</option>
                                {serviciosUnicos.map(serv => (
                                    <option key={serv} value={serv}>{serv}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="filtros-actions">
                        <Button
                            variant="primary"
                            onClick={handleGenerarReporte}
                            disabled={isGenerating}
                        >
                            {isGenerating ? 'Generando...' : 'Generar Reporte'}
                        </Button>
                        <div className="export-buttons">
                            <button className="export-btn pdf" onClick={handleExportarPDF}>
                                📄 PDF
                            </button>
                            <button className="export-btn excel" onClick={handleExportarExcel}>
                                📊 Excel
                            </button>
                            <button className="export-btn print" onClick={handleImprimir}>
                                🖨️ Imprimir
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Resumen Estadístico */}
                <div className="stats-resumen">
                    <div className="stat-resumen-card">
                        <div className="stat-icon-resumen">📊</div>
                        <div className="stat-info-resumen">
                            <p className="stat-label">Total Servicios</p>
                            <p className="stat-number">{totalServicios}</p>
                        </div>
                    </div>
                    <div className="stat-resumen-card">
                        <div className="stat-icon-resumen">💰</div>
                        <div className="stat-info-resumen">
                            <p className="stat-label">Ingresos Totales</p>
                            <p className="stat-number">${totalIngresos.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="stat-resumen-card">
                        <div className="stat-icon-resumen">📈</div>
                        <div className="stat-info-resumen">
                            <p className="stat-label">Promedio por Servicio</p>
                            <p className="stat-number">${promedioServicio.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="stat-resumen-card">
                        <div className="stat-icon-resumen">🎁</div>
                        <div className="stat-info-resumen">
                            <p className="stat-label">Total Descuentos</p>
                            <p className="stat-number">${totalDescuentos.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Reporte de Servicios */}
                {reportType === 'servicios' && showPreview && (
                    <Card title={getTipoReporteTitle()} className="reporte-card">
                        <div className="tabla-container">
                            <table className="reporte-tabla">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Cliente</th>
                                        <th>Placa</th>
                                        <th>Servicio</th>
                                        <th>Operativo</th>
                                        <th>Subtotal</th>
                                        <th>Descuento</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviciosFiltrados.map(servicio => (
                                        <tr key={servicio.id}>
                                            <td>{servicio.fecha}</td>
                                            <td>{servicio.hora}</td>
                                            <td>{servicio.cliente}</td>
                                            <td>{servicio.placa}</td>
                                            <td>{servicio.servicio}</td>
                                            <td>{servicio.operativo}</td>
                                            <td>${servicio.subtotal.toFixed(2)}</td>
                                            <td>${servicio.descuento.toFixed(2)}</td>
                                            <td className="total-cell">${servicio.total.toFixed(2)}</td>
                                            <td>
                                                <span className={`estado-badge ${servicio.estado}`}>
                                                    {servicio.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="total-row">
                                        <td colSpan={6}><strong>Totales</strong></td>
                                        <td><strong>${serviciosFiltrados.reduce((s, i) => s + i.subtotal, 0).toFixed(2)}</strong></td>
                                        <td><strong>${serviciosFiltrados.reduce((s, i) => s + i.descuento, 0).toFixed(2)}</strong></td>
                                        <td colSpan={2}><strong>${totalIngresos.toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="reporte-footer">
                            <span>Total de registros: {serviciosFiltrados.length}</span>
                            <span>Período: {fechaInicio} al {fechaFin}</span>
                        </div>
                    </Card>
                )}

                {/* Reporte de Ventas Diarias */}
                {reportType === 'ventas' && showPreview && (
                    <Card title={getTipoReporteTitle()} className="reporte-card">
                        <div className="ventas-chart">
                            <h4>Gráfico de Ventas Diarias</h4>
                            <div className="bar-chart">
                                {ventasDiariasData.map((venta, index) => (
                                    <div key={index} className="bar-item">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                height: `${(venta.totalIngresos / 800) * 200}px`,
                                                backgroundColor: '#3b82f6'
                                            }}
                                        >
                                            <span className="bar-value">${venta.totalIngresos}</span>
                                        </div>
                                        <span className="bar-label">{venta.fecha.slice(5)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tabla-container">
                            <table className="reporte-tabla">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Total Servicios</th>
                                        <th>Ingresos Totales</th>
                                        <th>Promedio por Servicio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventasDiariasData.map((venta, index) => (
                                        <tr key={index}>
                                            <td>{venta.fecha}</td>
                                            <td>{venta.totalServicios}</td>
                                            <td>${venta.totalIngresos.toFixed(2)}</td>
                                            <td>${venta.promedio.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="total-row">
                                        <td><strong>Totales</strong></td>
                                        <td><strong>{ventasDiariasData.reduce((s, v) => s + v.totalServicios, 0)}</strong></td>
                                        <td><strong>${ventasDiariasData.reduce((s, v) => s + v.totalIngresos, 0).toFixed(2)}</strong></td>
                                        <td><strong>${(ventasDiariasData.reduce((s, v) => s + v.totalIngresos, 0) / ventasDiariasData.reduce((s, v) => s + v.totalServicios, 0)).toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Reporte de Productos Más Utilizados */}
                {reportType === 'productos' && showPreview && (
                    <Card title={getTipoReporteTitle()} className="reporte-card">
                        <div className="productos-chart">
                            <div className="donut-chart-container">
                                <div className="donut-chart">
                                    {productosMasUsados.map((producto, index) => {
                                        let cumulativeAngle = 0
                                        const previousAngles = productosMasUsados.slice(0, index).reduce((sum, p) => sum + p.porcentaje, 0)
                                        const angle = (producto.porcentaje / 100) * 360
                                        return (
                                            <div
                                                key={index}
                                                className="donut-segment"
                                                style={{
                                                    transform: `rotate(${previousAngles * 3.6}deg)`,
                                                    background: `conic-gradient(${getColor(index)} 0deg ${angle}deg, transparent ${angle}deg 360deg)`
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                                <div className="donut-legend">
                                    {productosMasUsados.map((producto, index) => (
                                        <div key={index} className="legend-item">
                                            <div className="legend-color" style={{ backgroundColor: getColor(index) }}></div>
                                            <span>{producto.nombre}</span>
                                            <span className="legend-percentage">{producto.porcentaje}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="tabla-container">
                            <table className="reporte-tabla">
                                <thead>
                                    <tr>
                                        <th>Producto/Servicio</th>
                                        <th>Cantidad Realizada</th>
                                        <th>Porcentaje</th>
                                        <th>Ingresos Generados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosMasUsados.map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>
                                                <div className="percentage-bar">
                                                    <div className="percentage-fill" style={{ width: `${producto.porcentaje}%`, backgroundColor: getColor(index) }}></div>
                                                    <span>{producto.porcentaje}%</span>
                                                </div>
                                            </td>
                                            <td>${(producto.cantidad * 25).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Reporte de Rendimiento por Operativo */}
                {reportType === 'operativos' && showPreview && (
                    <Card title={getTipoReporteTitle()} className="reporte-card">
                        <div className="operativos-grid">
                            {operativosRendimiento.map((operativo, index) => (
                                <div key={index} className="operativo-card-mini">
                                    <div className="operativo-header">
                                        <div className="operativo-avatar">
                                            {operativo.nombre.charAt(0)}
                                        </div>
                                        <h4>{operativo.nombre}</h4>
                                    </div>
                                    <div className="operativo-stats">
                                        <div className="stat">
                                            <span className="stat-label">Servicios</span>
                                            <span className="stat-value">{operativo.serviciosRealizados}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Ingresos</span>
                                            <span className="stat-value">${operativo.ingresosGenerados.toFixed(2)}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Promedio</span>
                                            <span className="stat-value">${operativo.promedioServicio.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="performance-bar">
                                        <div
                                            className="performance-fill"
                                            style={{
                                                width: `${(operativo.serviciosRealizados / 50) * 100}%`,
                                                backgroundColor: '#3b82f6'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tabla-container">
                            <table className="reporte-tabla">
                                <thead>
                                    <tr>
                                        <th>Operativo</th>
                                        <th>Servicios Realizados</th>
                                        <th>Ingresos Generados</th>
                                        <th>Promedio por Servicio</th>
                                        <th>Participación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operativosRendimiento.map((operativo, index) => {
                                        const totalServicios = operativosRendimiento.reduce((s, o) => s + o.serviciosRealizados, 0)
                                        const participacion = (operativo.serviciosRealizados / totalServicios) * 100
                                        return (
                                            <tr key={index}>
                                                <td><strong>{operativo.nombre}</strong></td>
                                                <td>{operativo.serviciosRealizados}</td>
                                                <td>${operativo.ingresosGenerados.toFixed(2)}</td>
                                                <td>${operativo.promedioServicio.toFixed(2)}</td>
                                                <td>
                                                    <div className="percentage-bar">
                                                        <div className="percentage-fill" style={{ width: `${participacion}%`, backgroundColor: '#10b981' }}></div>
                                                        <span>{participacion.toFixed(1)}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="total-row">
                                        <td><strong>Totales</strong></td>
                                        <td><strong>{operativosRendimiento.reduce((s, o) => s + o.serviciosRealizados, 0)}</strong></td>
                                        <td><strong>${operativosRendimiento.reduce((s, o) => s + o.ingresosGenerados, 0).toFixed(2)}</strong></td>
                                        <td><strong>${(operativosRendimiento.reduce((s, o) => s + o.ingresosGenerados, 0) / operativosRendimiento.reduce((s, o) => s + o.serviciosRealizados, 0)).toFixed(2)}</strong></td>
                                        <td><strong>100%</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Mensaje cuando no se ha generado reporte */}
                {!showPreview && (
                    <div className="no-reporte">
                        <div className="no-reporte-icon">📊</div>
                        <h3>No hay reporte generado</h3>
                        <p>Selecciona los filtros y haz clic en "Generar Reporte" para visualizar los datos</p>
                    </div>
                )}
            </div>
        </div>
    )
}

// Función auxiliar para obtener colores
const getColor = (index: number): string => {
    const colors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#06b6d4', '#ec489a', '#84cc16', '#f97316', '#6366f1'
    ]
    return colors[index % colors.length]
}

export default Reportes