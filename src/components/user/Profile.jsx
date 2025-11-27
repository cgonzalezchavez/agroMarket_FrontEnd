import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'
import ReputationBadge from '../reputation/ReputationBadge'

const Profile = () => {
  const { user } = useAuth()
  const [loading] = useState(false)

  if (loading) {
    return <LoadingSpinner message="Cargando perfil..." />
  }

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">
        <i className="bi bi-person-circle me-2 text-green"></i>
        Mi Perfil
      </h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-4">Información Personal</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre</label>
                <p className="form-control-plaintext">{user?.name || 'N/A'}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <p className="form-control-plaintext">{user?.email || 'N/A'}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Rol</label>
                <p className="form-control-plaintext">
                  <span className="badge bg-primary">
                    {user?.role === 'seller' ? 'Vendedor' : 'Comprador'}
                  </span>
                </p>
              </div>
              <button className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-person-circle text-green" style={{ fontSize: '5rem' }}></i>
              <h5 className="mt-3 fw-semibold">{user?.name}</h5>
              <p className="text-muted mb-3">{user?.email}</p>
              <ReputationBadge score={4.8} count={15} size="large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
