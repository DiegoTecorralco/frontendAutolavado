import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import Table from '../common/Table'
import './Inventario.css'

// Interfaces
interface Producto {
    id: number
    codigo: string
    nombre: string
    categoria: string
    stock: number
    stockMinimo: number
    precioCompra: number
    precioVenta: number
    unidad: string
    proveedor: string
    ubicacion: string
    fechaVencimiento?: string
}

interface Categoria {
    id: number
    nombre: string
    color: string
}

interface Proveedor {
    id: number
    nombre: string
    telefono: string
    email: string
}

// Datos de ejemplo
const categoriasData: Categoria[] = [
    { id: 1, nombre: 'Limpieza Exterior', color: '#3b82f6' },
    { id: 2, nombre: 'Limpieza Interior', color: '#10b981' },
    { id: 3, nombre: 'Abrasivos', color: '#f59e0b' },
    { id: 4, nombre: 'Ceras y Pulidores', color: '#8b5cf6' },
    { id: 5, nombre: 'Herramientas', color: '#ef4444' },
    { id: 6, nombre: 'Químicos', color: '#06b6d4' }
]

const proveedoresData: Proveedor[] = [
    { id: 1, nombre: 'AutoClean S.A.', telefono: '555-0101', email: 'ventas@autoclean.com' },
    { id: 2, nombre: 'Wash Supplies', telefono: '555-0202', email: 'info@washsupplies.com' },
    { id: 3, nombre: 'Detail Pro', telefono: '555-0303', email: 'contacto@detailpro.com' },
    { id: 4, nombre: 'CarCare Plus', telefono: '555-0404', email: 'ventas@carcare.com' }
]

const productosData: Producto[] = [
    {
        id: 1,
        codigo: 'SH-001',
        nombre: 'Shampoo para Autos',
        categoria: 'Limpieza Exterior',
        stock: 45,
        stockMinimo: 10,
        precioCompra: 8.50,
        precioVenta: 15.00,
        unidad: 'Galón',
        proveedor: 'AutoClean S.A.',
        ubicacion: 'Estante A1'
    },
    {
        id: 2,
        codigo: 'CE-002',
        nombre: 'Cera Líquida',
        categoria: 'Ceras y Pulidores',
        stock: 12,
        stockMinimo: 5,
        precioCompra: 12.00,
        precioVenta: 25.00,
        unidad: 'Botella',
        proveedor: 'Detail Pro',
        ubicacion: 'Estante B2'
    },
    {
        id: 3,
        codigo: 'MI-003',
        nombre: 'Microfibra (Paquete x3)',
        categoria: 'Herramientas',
        stock: 85,
        stockMinimo: 20,
        precioCompra: 4.00,
        precioVenta: 8.00,
        unidad: 'Paquete',
        proveedor: 'Wash Supplies',
        ubicacion: 'Estante C3'
    },
    {
        id: 4,
        codigo: 'DE-004',
        nombre: 'Desengrasante',
        categoria: 'Químicos',
        stock: 8,
        stockMinimo: 10,
        precioCompra: 10.00,
        precioVenta: 18.00,
        unidad: 'Galón',
        proveedor: 'AutoClean S.A.',
        ubicacion: 'Estante A2',
        fechaVencimiento: '2024-12-31'
    },
    {
        id: 5,
        codigo: 'AB-005',
        nombre: 'Abrillantador de Llantas',
        categoria: 'Limpieza Exterior',
        stock: 23,
        stockMinimo: 8,
        precioCompra: 9.00,
        precioVenta: 16.00,
        unidad: 'Spray',
        proveedor: 'CarCare Plus',
        ubicacion: 'Estante B1'
    },
    {
        id: 6,
        codigo: 'AS-006',
        nombre: 'Aspiradora Industrial',
        categoria: 'Herramientas',
        stock: 3,
        stockMinimo: 2,
        precioCompra: 150.00,
        precioVenta: 250.00,
        unidad: 'Unidad',
        proveedor: 'Detail Pro',
        ubicacion: 'Herramientas'
    },
    {
        id: 7,
        codigo: 'HI-007',
        nombre: 'Hidrolavadora',
        categoria: 'Herramientas',
        stock: 2,
        stockMinimo: 1,
        precioCompra: 200.00,
        precioVenta: 350.00,
        unidad: 'Unidad',
        proveedor: 'Wash Supplies',
        ubicacion: 'Herramientas'
    },
    {
        id: 8,
        codigo: 'FR-008',
        nombre: 'Fragancia para Autos',
        categoria: 'Limpieza Interior',
        stock: 32,
        stockMinimo: 15,
        precioCompra: 3.00,
        precioVenta: 6.00,
        unidad: 'Unidad',
        proveedor: 'CarCare Plus',
        ubicacion: 'Estante C1'
    }
]

interface InventarioProps {
    onNavigate?: (path: string) => void
}

const Inventario = ({ onNavigate }: InventarioProps) => {
    const navigate = useNavigate()

    // Estados
    const [productos, setProductos] = useState<Producto[]>(productosData)
    const [categorias] = useState<Categoria[]>(categoriasData)
    const [proveedores] = useState<Proveedor[]>(proveedoresData)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategoria, setSelectedCategoria] = useState('todas')
    const [showLowStock, setShowLowStock] = useState(false)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState<Producto | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null)

    // Estado para nuevo producto
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: '',
        nombre: '',
        categoria: '',
        stock: 0,
        stockMinimo: 0,
        precioCompra: 0,
        precioVenta: 0,
        unidad: '',
        proveedor: '',
        ubicacion: '',
        fechaVencimiento: ''
    })

    const [errors, setErrors] = useState<any>({})

    // Estadísticas
    const totalProductos = productos.length
    const totalStock = productos.reduce((sum, p) => sum + p.stock, 0)
    const valorInventario = productos.reduce((sum, p) => sum + (p.precioCompra * p.stock), 0)
    const productosBajoStock = productos.filter(p => p.stock <= p.stockMinimo).length

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategoria = selectedCategoria === 'todas' || producto.categoria === selectedCategoria
        const matchesLowStock = !showLowStock || producto.stock <= producto.stockMinimo
        return matchesSearch && matchesCategoria && matchesLowStock
    })

    // Columnas para la tabla
    const columns = [
        { key: 'codigo', label: 'CÓDIGO' },
        { key: 'nombre', label: 'PRODUCTO' },
        { key: 'categoria', label: 'CATEGORÍA' },
        {
            key: 'stock',
            label: 'STOCK',
            render: (value: number, row: Producto) => (
                <span className={`stock-badge ${value <= row.stockMinimo ? 'low-stock' : ''}`}>
                    {value} {row.unidad}
                    {value <= row.stockMinimo && <span className="warning-icon">⚠️</span>}
                </span>
            )
        },
        {
            key: 'precioVenta',
            label: 'PRECIO VENTA',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        { key: 'proveedor', label: 'PROVEEDOR' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            render: (_: any, row: Producto) => (
                <div className="action-buttons">
                    <button
                        className="icon-btn view-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProduct(row)
                        }}
                        title="Ver detalles"
                    >
                        👁️
                    </button>
                    <button
                        className="icon-btn edit-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEditProduct(row)
                        }}
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        className="icon-btn delete-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProduct(row.id)
                        }}
                        title="Eliminar"
                    >
                        🗑️
                    </button>
                </div>
            )
        }
    ]

    const handleEditProduct = (producto: Producto) => {
        setShowEditProduct(producto)
        setNuevoProducto({
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria,
            stock: producto.stock,
            stockMinimo: producto.stockMinimo,
            precioCompra: producto.precioCompra,
            precioVenta: producto.precioVenta,
            unidad: producto.unidad,
            proveedor: producto.proveedor,
            ubicacion: producto.ubicacion,
            fechaVencimiento: producto.fechaVencimiento || ''
        })
    }

    const handleDeleteProduct = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            setProductos(productos.filter(p => p.id !== id))
            if (selectedProduct?.id === id) setSelectedProduct(null)
        }
    }

    const handleAddProduct = () => {
        // Validaciones
        const newErrors: any = {}
        if (!nuevoProducto.codigo) newErrors.codigo = 'El código es requerido'
        if (!nuevoProducto.nombre) newErrors.nombre = 'El nombre es requerido'
        if (!nuevoProducto.categoria) newErrors.categoria = 'La categoría es requerida'
        if (nuevoProducto.stock < 0) newErrors.stock = 'El stock no puede ser negativo'
        if (nuevoProducto.stockMinimo < 0) newErrors.stockMinimo = 'El stock mínimo no puede ser negativo'
        if (nuevoProducto.precioCompra < 0) newErrors.precioCompra = 'El precio de compra no puede ser negativo'
        if (nuevoProducto.precioVenta < 0) newErrors.precioVenta = 'El precio de venta no puede ser negativo'
        if (!nuevoProducto.unidad) newErrors.unidad = 'La unidad es requerida'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Verificar código único
        const codigoExiste = productos.some(p => p.codigo === nuevoProducto.codigo &&
            (!showEditProduct || p.id !== showEditProduct?.id))
        if (codigoExiste) {
            setErrors({ codigo: 'Este código ya existe' })
            return
        }

        if (showEditProduct) {
            // Editar producto existente
            setProductos(productos.map(p =>
                p.id === showEditProduct.id
                    ? { ...p, ...nuevoProducto }
                    : p
            ))
            alert('Producto actualizado exitosamente')
        } else {
            // Crear nuevo producto
            const newProduct: Producto = {
                id: productos.length + 1,
                ...nuevoProducto
            }
            setProductos([...productos, newProduct])
            alert('Producto agregado exitosamente')
        }

        // Limpiar formulario
        resetForm()
    }

    const resetForm = () => {
        setNuevoProducto({
            codigo: '',
            nombre: '',
            categoria: '',
            stock: 0,
            stockMinimo: 0,
            precioCompra: 0,
            precioVenta: 0,
            unidad: '',
            proveedor: '',
            ubicacion: '',
            fechaVencimiento: ''
        })
        setErrors({})
        setShowAddProduct(false)
        setShowEditProduct(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNuevoProducto(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const getCategoriaColor = (categoriaNombre: string) => {
        const categoria = categorias.find(c => c.nombre === categoriaNombre)
        return categoria?.color || '#6b7280'
    }

    const handleExportReport = () => {
        console.log('Exportando reporte de inventario...')
        alert('Exportando reporte de inventario...')
    }

    const handleAdjustStock = (producto: Producto, incremento: number) => {
        const newStock = Math.max(0, producto.stock + incremento)
        setProductos(productos.map(p =>
            p.id === producto.id
                ? { ...p, stock: newStock }
                : p
        ))
    }

    return (
        <div className="inventario-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gestión de Inventario</h1>
                    <p className="page-subtitle">Control de productos, stock y proveedores</p>
                </div>
                <Button variant="primary" onClick={() => setShowAddProduct(true)}>
                    + Agregar Producto
                </Button>
            </div>

            <div className="inventario-content">
                {/* Tarjetas de Estadísticas */}
                <div className="stats-grid">
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">📦</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Total Productos</p>
                            <p className="stat-value-mini">{totalProductos}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">📊</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Stock Total</p>
                            <p className="stat-value-mini">{totalStock} uds</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">💰</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Valor Inventario</p>
                            <p className="stat-value-mini">${valorInventario.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="stat-card-mini">
                        <div className="stat-icon-mini">⚠️</div>
                        <div className="stat-info-mini">
                            <p className="stat-title-mini">Productos Bajo Stock</p>
                            <p className={`stat-value-mini ${productosBajoStock > 0 ? 'warning' : ''}`}>
                                {productosBajoStock}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lista de Productos */}
                <Card className="productos-card">
                    <div className="inventario-header">
                        <div className="filters">
                            <div className="search-wrapper">
                                <Input
                                    type="text"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por nombre o código..."
                                />
                            </div>
                            <div className="filter-group">
                                <select
                                    className="filter-select"
                                    value={selectedCategoria}
                                    onChange={(e) => setSelectedCategoria(e.target.value)}
                                >
                                    <option value="todas">Todas las categorías</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={showLowStock}
                                    onChange={(e) => setShowLowStock(e.target.checked)}
                                />
                                Mostrar solo productos con stock bajo
                            </label>
                        </div>
                        <button className="export-report-btn" onClick={handleExportReport}>
                            📊 Exportar Reporte
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={productosFiltrados}
                    />

                    <div className="table-footer">
                        <span>Mostrando {productosFiltrados.length} de {productos.length} productos</span>
                    </div>
                </Card>
            </div>

            {/* Modal para Detalles del Producto */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalles del Producto</h3>
                        <div className="product-details-modal">
                            <div className="detail-row">
                                <strong>Código:</strong> {selectedProduct.codigo}
                            </div>
                            <div className="detail-row">
                                <strong>Nombre:</strong> {selectedProduct.nombre}
                            </div>
                            <div className="detail-row">
                                <strong>Categoría:</strong>
                                <span className="category-badge" style={{ backgroundColor: getCategoriaColor(selectedProduct.categoria) }}>
                                    {selectedProduct.categoria}
                                </span>
                            </div>
                            <div className="detail-row">
                                <strong>Stock Actual:</strong>
                                <span className={selectedProduct.stock <= selectedProduct.stockMinimo ? 'warning-text' : ''}>
                                    {selectedProduct.stock} {selectedProduct.unidad}
                                </span>
                            </div>
                            <div className="detail-row">
                                <strong>Stock Mínimo:</strong> {selectedProduct.stockMinimo} {selectedProduct.unidad}
                            </div>
                            <div className="detail-row">
                                <strong>Precio Compra:</strong> ${selectedProduct.precioCompra.toFixed(2)}
                            </div>
                            <div className="detail-row">
                                <strong>Precio Venta:</strong> ${selectedProduct.precioVenta.toFixed(2)}
                            </div>
                            <div className="detail-row">
                                <strong>Proveedor:</strong> {selectedProduct.proveedor}
                            </div>
                            <div className="detail-row">
                                <strong>Ubicación:</strong> {selectedProduct.ubicacion}
                            </div>
                            {selectedProduct.fechaVencimiento && (
                                <div className="detail-row">
                                    <strong>Fecha Vencimiento:</strong> {selectedProduct.fechaVencimiento}
                                </div>
                            )}
                        </div>
                        <div className="stock-actions">
                            <button className="stock-btn" onClick={() => handleAdjustStock(selectedProduct, -1)}>
                                -1
                            </button>
                            <span>AJUSTAR STOCK</span>
                            <button className="stock-btn" onClick={() => handleAdjustStock(selectedProduct, 1)}>
                                +1
                            </button>
                        </div>
                        <div className="modal-actions">
                            <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => {
                                handleEditProduct(selectedProduct)
                                setSelectedProduct(null)
                            }}>
                                Editar Producto
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Agregar/Editar Producto */}
            {(showAddProduct || showEditProduct) && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>{showEditProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Código *</label>
                                <Input
                                    type="text"
                                    name="codigo"
                                    value={nuevoProducto.codigo}
                                    onChange={handleInputChange}
                                    placeholder="Ej: SH-001"
                                    error={errors.codigo}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nombre *</label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    value={nuevoProducto.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Nombre del producto"
                                    error={errors.nombre}
                                />
                            </div>

                            <div className="form-group">
                                <label>Categoría *</label>
                                <select
                                    name="categoria"
                                    className="select-field"
                                    value={nuevoProducto.categoria}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                    ))}
                                </select>
                                {errors.categoria && <span className="error-text">{errors.categoria}</span>}
                            </div>

                            <div className="form-group">
                                <label>Unidad *</label>
                                <select
                                    name="unidad"
                                    className="select-field"
                                    value={nuevoProducto.unidad}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione una unidad</option>
                                    <option value="Unidad">Unidad</option>
                                    <option value="Paquete">Paquete</option>
                                    <option value="Galón">Galón</option>
                                    <option value="Litro">Litro</option>
                                    <option value="Botella">Botella</option>
                                    <option value="Spray">Spray</option>
                                </select>
                                {errors.unidad && <span className="error-text">{errors.unidad}</span>}
                            </div>

                            <div className="form-group">
                                <label>Stock *</label>
                                <Input
                                    type="number"
                                    name="stock"
                                    value={nuevoProducto.stock}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    error={errors.stock}
                                />
                            </div>

                            <div className="form-group">
                                <label>Stock Mínimo *</label>
                                <Input
                                    type="number"
                                    name="stockMinimo"
                                    value={nuevoProducto.stockMinimo}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    error={errors.stockMinimo}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Compra ($) *</label>
                                <Input
                                    type="number"
                                    name="precioCompra"
                                    value={nuevoProducto.precioCompra}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    error={errors.precioCompra}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Venta ($) *</label>
                                <Input
                                    type="number"
                                    name="precioVenta"
                                    value={nuevoProducto.precioVenta}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    error={errors.precioVenta}
                                />
                            </div>

                            <div className="form-group">
                                <label>Proveedor</label>
                                <select
                                    name="proveedor"
                                    className="select-field"
                                    value={nuevoProducto.proveedor}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione un proveedor</option>
                                    {proveedores.map(prov => (
                                        <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ubicación</label>
                                <Input
                                    type="text"
                                    name="ubicacion"
                                    value={nuevoProducto.ubicacion}
                                    onChange={handleInputChange}
                                    placeholder="Ej: Estante A1"
                                />
                            </div>

                            <div className="form-group">
                                <label>Fecha Vencimiento</label>
                                <Input
                                    type="date"
                                    name="fechaVencimiento"
                                    value={nuevoProducto.fechaVencimiento}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <Button variant="secondary" onClick={resetForm}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleAddProduct}>
                                {showEditProduct ? 'Actualizar Producto' : 'Guardar Producto'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Inventario