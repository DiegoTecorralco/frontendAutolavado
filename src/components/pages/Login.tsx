import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import './Login.css'

interface LoginFormData {
    username: string
    password: string
}

interface FormErrors {
    username?: string
    password?: string
}

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newErrors: FormErrors = {}
        if (!formData.username) newErrors.username = 'El usuario es requerido'
        if (!formData.password) newErrors.password = 'La contraseña es requerida'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        try {
            // Simulación de autenticación
            console.log('Login data:', formData)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Aquí iría la llamada real al servicio de autenticación
            // Por ahora, simulamos un login exitoso con credenciales fijas
            if (formData.username === 'admin' && formData.password === 'admin123') {
                // Guardar token o estado de autenticación
                localStorage.setItem('isAuthenticated', 'true')
                localStorage.setItem('user', JSON.stringify({ username: formData.username }))
                // Redirigir al dashboard
                navigate('/dashboard')
            } else {
                setErrors({ username: 'Credenciales incorrectas', password: 'Credenciales incorrectas' })
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            setErrors({ username: 'Error al conectar con el servidor' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateAccount = () => {
        // Navegar a la página de registro
        console.log('Navegar a crear cuenta')
        navigate('/registro')
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">UTXJ Autolavado</h1>
                    <p className="login-subtitle">INICIAR SESIÓN</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="usuario"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Ingresa tu usuario"
                        error={errors.username}
                    />

                    <Input
                        label="contraseña"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña"
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                </form>

                <div className="login-footer">
                    <p className="footer-text">¿Aún no tienes una cuenta?</p>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCreateAccount}
                        fullWidth
                    >
                        Click para crear cuenta
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login