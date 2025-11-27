import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ErrorMessage from '../common/ErrorMessage'
import SuccessMessage from '../common/SuccessMessage'
import './Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    phone: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    const { confirmPassword, ...registerData } = formData
    const result = await register(registerData)
    
    if (result.success) {
      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow-lg auth-card fade-in">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-plus text-green" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3 fw-bold">Crear Cuenta</h2>
                  <p className="text-muted">Únete a AgroMarket hoy</p>
                </div>

                <ErrorMessage message={error} onClose={() => setError('')} />
                <SuccessMessage message={success} onClose={() => setSuccess('')} />

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        <i className="bi bi-person me-2"></i>
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="bi bi-envelope me-2"></i>
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label">
                        <i className="bi bi-lock me-2"></i>
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        <i className="bi bi-lock-fill me-2"></i>
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      <i className="bi bi-briefcase me-2"></i>
                      Tipo de Usuario
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="buyer">Comprador</option>
                      <option value="seller">Vendedor</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        <i className="bi bi-telephone me-2"></i>
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="address" className="form-label">
                        <i className="bi bi-geo-alt me-2"></i>
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Ciudad, País"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registrando...
                      </span>
                    ) : (
                      <span>
                        <i className="bi bi-person-plus me-2"></i>
                        Crear Cuenta
                      </span>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-green fw-semibold">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
