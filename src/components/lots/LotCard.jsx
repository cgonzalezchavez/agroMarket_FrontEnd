import { Link } from 'react-router-dom'
import './LotCard.css'

const LotCard = ({ lot }) => {
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Calculate time remaining or days ago
  const getTimeLabel = (date) => {
    const now = new Date()
    const created = new Date(date)
    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    return `Hace ${diffDays} días`
  }

  return (
    <div className="card h-100 lot-card fade-in">
      <div className="position-relative">
        <img 
          src={lot.image || 'https://placehold.co/600x400?text=Sin+Imagen'} 
          className="card-img-top lot-image" 
          alt={lot.title} 
        />
        <span className="badge bg-success position-absolute top-0 end-0 m-2">
          {lot.category}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0 text-truncate" title={lot.title}>
            {lot.title}
          </h5>
        </div>
        
        <p className="card-text text-muted small mb-3 flex-grow-1 line-clamp-2">
          {lot.description}
        </p>
        
        <div className="lot-details mb-3">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-geo-alt text-green me-2"></i>
            <span className="small text-truncate">
              {typeof lot.location === 'object' ? lot.location.dept : lot.location}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-box-seam text-green me-2"></i>
            <span className="small">{lot.quantity} {lot.unit}</span>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-end mt-auto">
          <div>
            <small className="text-muted d-block">Precio por {lot.unit}</small>
            <span className="h5 fw-bold text-green mb-0">
              {formatPrice(lot.price)}
            </span>
          </div>
          <small className="text-muted">
            {getTimeLabel(lot.createdAt)}
          </small>
        </div>
      </div>
      
      <div className="card-footer bg-white border-top-0 pt-0 pb-3">
        <Link to={`/lots/${lot.id}`} className="btn btn-outline-primary w-100">
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}

export default LotCard
