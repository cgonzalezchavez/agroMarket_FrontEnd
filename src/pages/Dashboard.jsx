import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [])

  if (loading) {
    return <LoadingSpinner message="Cargando dashboard..." />
  }

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold">
            <i className="bi bi-speedometer2 me-2 text-green"></i>
            Dashboard
          </h1>
          <p className="text-muted">Bienvenido de vuelta, {user?.name}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-box-seam text-green" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="mt-3 mb-0">0</h3>
              <p className="text-muted mb-0">Mis Lotes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-tag text-success" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="mt-3 mb-0">0</h3>
              <p className="text-muted mb-0">Ofertas Activas</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-receipt text-warning" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="mt-3 mb-0">0</h3>
              <p className="text-muted mb-0">Transacciones</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-star-fill text-warning" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="mt-3 mb-0">5.0</h3>
              <p className="text-muted mb-0">Reputación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-5">
        <div className="col">
          <h3 className="fw-semibold mb-3">Acciones Rápidas</h3>
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/my-lots" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Crear Nuevo Lote
            </Link>
            <Link to="/my-offers" className="btn btn-success">
              <i className="bi bi-tag me-2"></i>
              Ver Mis Ofertas
            </Link>
            <Link to="/my-transactions" className="btn btn-info text-white">
              <i className="bi bi-receipt me-2"></i>
              Ver Transacciones
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col">
          <h3 className="fw-semibold mb-3">Actividad Reciente</h3>
          <div className="card">
            <div className="card-body text-center py-5">
              <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
              <p className="text-muted mt-3 mb-0">No hay actividad reciente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
