import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-flower2 me-2"></i>
          AgroMarket
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i>
                Inicio
              </Link>
            </li>
            
            {isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-lots">
                    <i className="bi bi-box-seam me-1"></i>
                    Mis Lotes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-offers">
                    <i className="bi bi-tag me-1"></i>
                    Mis Ofertas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-transactions">
                    <i className="bi bi-receipt me-1"></i>
                    Transacciones
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    id="navbarDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.name || 'Usuario'}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>
                        Mi Perfil
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success ms-2" to="/register">
                    <i className="bi bi-person-plus me-1"></i>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
