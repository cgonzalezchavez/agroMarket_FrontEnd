import { Link } from 'react-router-dom'
import './LotCard.css'

const LotCard = ({ lot }) => {
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Format number to locale string
  const formatNumber = (value) => {
    if (!value) return '0';
  
    // Convertimos a número por si la DB lo devuelve como string ("1000.00")
    const number = Number(value);

    // 'es-PY' formatea así: 1.000 (miles con punto)
    // maximumFractionDigits: 3 (para respetar tu configuración de DB anterior)
    return number.toLocaleString('es-PY', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 3 
    });
  };

  // Calculate time remaining or days ago
  const getTimeLabel = (date) => {
    const now = new Date().setHours(0, 0, 0, 0)
    const created = new Date(date).setHours(0, 0, 0, 0)

    const diffTime = Math.abs(now - created)
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    return `Hace ${diffDays} días`
  }

  // Get display name for commodity
  const commodityName = lot.commodity_name || lot.category || 'Sin categoría'
  
  // Get price (backend uses price_base, some mock data uses price)
  const price = lot.price_base || lot.price || 0
  
  // Get created date (backend uses created_at, some mock data uses createdAt)
  const createdDate = lot.created_at || lot.createdAt || new Date().toISOString()

  return (
    <div className="card h-100 lot-card fade-in">
      <div className="position-relative">
        <img 
          src={lot.image || 'https://placehold.co/600x400?text=Sin+Imagen'} 
          className="card-img-top lot-image" 
          alt={lot.variety || commodityName} 
        />
        <span className="badge bg-success position-absolute top-0 end-0 m-2">
          {commodityName}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0 text-truncate" title={lot.variety || commodityName}>
            {lot.variety || commodityName}
          </h5>
        </div>
        
        <p className="card-text text-muted small mb-3 flex-grow-1 line-clamp-2">
          {lot.description || `Lote de ${commodityName}`}
        </p>
        
        <div className="lot-details mb-3">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-geo-alt text-green me-2"></i>
            <span className="small text-truncate">
              {typeof lot.location === 'object' ? lot.location.dept : lot.location || 'Sin ubicación'}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-box-seam text-green me-2"></i>
            <span className="small"> {formatNumber(lot.quantity)} {lot.unit?.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-end mt-auto">
          <div>
            <small className="text-muted d-block">Precio por {lot.unit?.toUpperCase()}</small>
            <span className="h5 fw-bold text-green mb-0">
              {formatPrice(price)}
            </span>
          </div>
          <small className="text-muted">
            {getTimeLabel(createdDate)}
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

