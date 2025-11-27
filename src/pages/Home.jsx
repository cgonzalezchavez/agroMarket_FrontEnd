import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LotList from '../components/lots/LotList'
import './Home.css'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4 fade-in">
                Bienvenido a <span className="text-green">AgroMarket</span>
              </h1>
              <p className="lead mb-4 slide-in">
                La plataforma líder para el comercio de productos agrícolas. 
                Conectamos productores con compradores de manera eficiente y segura.
              </p>
              <div className="d-flex gap-3">
                {isAuthenticated() ? (
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Ir al Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <i className="bi bi-person-plus me-2"></i>
                      Comenzar Ahora
                    </Link>
                    <Link to="/login" className="btn btn-outline-success btn-lg">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <i className="bi bi-flower2 text-green"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lots Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Lotes Destacados</h2>
            <Link to="/search" className="btn btn-outline-primary">
              Ver Todos
            </Link>
          </div>
          <LotList />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">¿Por qué elegir AgroMarket?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-shield-check text-green"></i>
                </div>
                <h4 className="fw-semibold">Seguro y Confiable</h4>
                <p className="text-muted">
                  Sistema de reputación y transacciones seguras para proteger tu negocio.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-graph-up text-green"></i>
                </div>
                <h4 className="fw-semibold">Fácil de Usar</h4>
                <p className="text-muted">
                  Interfaz intuitiva para gestionar tus productos y ofertas sin complicaciones.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card card h-100 text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-people text-green"></i>
                </div>
                <h4 className="fw-semibold">Comunidad Activa</h4>
                <p className="text-muted">
                  Conecta con productores y compradores de toda la región.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated() && (
        <section className="cta-section py-5">
          <div className="container text-center">
            <h2 className="mb-4 fw-bold">¿Listo para comenzar?</h2>
            <p className="lead mb-4">
              Únete a miles de productores y compradores que ya confían en AgroMarket
            </p>
            <Link to="/register" className="btn btn-success btn-lg">
              <i className="bi bi-person-plus me-2"></i>
              Crear Cuenta Gratis
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
