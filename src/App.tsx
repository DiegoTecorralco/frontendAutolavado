import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/pages/Login'
import MainLayout from './components/layout/MainLayout'
import './App.css'

function App() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
      {/* Rutas adicionales */}
      <Route 
        path="/clientes" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/vehiculos" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/servicios" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/inventario" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/reportes" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/usuarios" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/configuracion" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

export default App