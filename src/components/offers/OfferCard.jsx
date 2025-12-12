import { useState } from 'react'
import './OfferCard.css'

const OfferCard = ({ offer, isReceived = false, onAccept, onReject }) => {
  const [loading, setLoading] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning text-dark',
      accepted: 'bg-success',
      rejected: 'bg-danger',
      cancelled: 'bg-secondary'
    }
    
    const labels = {
      pending: 'Pendiente',
      accepted: 'Aceptada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada'
    }

    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const handleAction = async (action) => {
    setLoading(true)
    try {
      if (action === 'accept') {
        await onAccept(offer.id)
      } else {
        await onReject(offer.id)
      }
    } catch (error) {
      console.error('Error processing offer:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card offer-card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title fw-bold mb-1">
              {offer.lotTitle || `Lote #${offer.lotId}`}
            </h5>
            <p className="text-muted small mb-0">
              {new Date(offer.createdAt).toLocaleDateString()}
            </p>
          </div>
          {getStatusBadge(offer.status)}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <small className="text-muted d-block">Precio Oferta</small>
              <span className="fw-bold text-green">
                {formatPrice(offer.amount)}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <small className="text-muted d-block">Cantidad</small>
              <span className="fw-bold">
                {offer.quantity} {offer.unit || 'TN'}
              </span>
            </div>
          </div>
        </div>

        {isReceived && (
          <div className="d-flex align-items-center mb-3">
            <div className="bg-light rounded-circle p-2 me-2">
              <i className="bi bi-person-fill text-secondary"></i>
            </div>
            <div>
              <small className="text-muted d-block">Oferta de:</small>
              <span className="fw-semibold">{offer.buyerName || 'Usuario'}</span>
            </div>
          </div>
        )}

        {isReceived && offer.status === 'pending' && (
          <div className="d-flex gap-2 mt-3">
            <button 
              className="btn btn-success flex-grow-1"
              onClick={() => handleAction('accept')}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Aceptar'}
            </button>
            <button 
              className="btn btn-outline-danger flex-grow-1"
              onClick={() => handleAction('reject')}
              disabled={loading}
            >
              Rechazar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OfferCard
