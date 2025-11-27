import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-green-light">
              <i className="bi bi-flower2 me-2"></i>
              AgroMarket
            </h5>
            <p className="text-muted">
              Plataforma de comercio de productos agrícolas. 
              Conectando productores con compradores de manera eficiente y segura.
            </p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6 className="text-green-light">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
              <li><Link to="/my-lots" className="footer-link">Mis Lotes</Link></li>
              <li><Link to="/my-offers" className="footer-link">Mis Ofertas</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6 className="text-green-light">Contacto</h6>
            <ul className="list-unstyled">
              <li className="text-muted">
                <i className="bi bi-envelope me-2"></i>
                info@agromarket.com
              </li>
              <li className="text-muted">
                <i className="bi bi-telephone me-2"></i>
                +1 234 567 890
              </li>
              <li className="text-muted">
                <i className="bi bi-geo-alt me-2"></i>
                Ciudad, País
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {currentYear} AgroMarket. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="footer-link me-3">Términos de Servicio</a>
            <a href="#" className="footer-link">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
