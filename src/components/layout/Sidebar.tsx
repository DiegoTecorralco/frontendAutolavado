import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Sidebar.css'

interface MenuItem {
    id: string
    label: string
    icon: string
    path: string
}

const menuItems: MenuItem[] = [
    { id: 'inicio', label: 'Inicio', icon: '🏠', path: '/dashboard' },
    { id: 'clientes', label: 'Clientes', icon: '👥', path: '/clientes' },
    { id: 'vehiculos', label: 'Vehículos', icon: '🚗', path: '/vehiculos' },
    { id: 'servicios', label: 'Servicios', icon: '🔧', path: '/servicios' },
    { id: 'inventario', label: 'Inventario', icon: '📦', path: '/inventario' },
    { id: 'reportes', label: 'Reportes', icon: '📊', path: '/reportes' },
    { id: 'usuarios', label: 'Usuarios', icon: '👤', path: '/usuarios' },
    { id: 'configuracion', label: 'Configuración', icon: '⚙️', path: '/configuracion' },
]

interface SidebarProps {
    onNavigate?: (path: string) => void
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const getActiveItem = () => {
        const currentPath = location.pathname
        const activeMenuItem = menuItems.find(item => item.path === currentPath)
        return activeMenuItem?.id || 'inicio'
    }

    const handleClick = (path: string) => {
        if (onNavigate) {
            onNavigate(path)
        }
    }

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-header">
                <h2 className="sidebar-title">AutoWash Pro</h2>
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar-item ${getActiveItem() === item.id ? 'active' : ''}`}
                        onClick={() => handleClick(item.path)}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar