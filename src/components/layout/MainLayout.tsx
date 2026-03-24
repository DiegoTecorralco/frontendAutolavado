import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard from '../pages/Dashboard'
import Clientes from '../pages/Clientes'
import Servicios from '../pages/Servicios'
import Inventario from '../pages/Inventario'
import Reportes from '../pages/Reportes'
import Usuarios from '../pages/Usuarios'
import Vehiculos from '../pages/Vehiculos'
import Configuracion from '../pages/Configuracion'
import './MainLayout.css'

const MainLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleNavigate = (path: string) => {
        navigate(path)
    }

    const renderContent = () => {
        const path = location.pathname

        switch (path) {
            case '/':
            case '/dashboard':
                return <Dashboard onNavigate={handleNavigate} />
            case '/clientes':
                return <Clientes onNavigate={handleNavigate} />
            case '/vehiculos':
                return <Vehiculos onNavigate={handleNavigate} />
            case '/servicios':
                return <Servicios onNavigate={handleNavigate} />
            case '/inventario':
                return <Inventario onNavigate={handleNavigate} />
            case '/reportes':
                return <Reportes onNavigate={handleNavigate} />
            case '/usuarios':
                return <Usuarios onNavigate={handleNavigate} />
            case '/configuracion':
                return <Configuracion onNavigate={handleNavigate} />
            default:
                return <Dashboard onNavigate={handleNavigate} />
        }
    }

    return (
        <div className="main-layout">
            <Sidebar onNavigate={handleNavigate} />
            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    )
}

export default MainLayout