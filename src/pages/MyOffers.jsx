import { useState } from 'react'
import OfferList from '../components/offers/OfferList'

const MyOffers = () => {
  const [activeTab, setActiveTab] = useState('received')

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">
        <i className="bi bi-tag me-2 text-green"></i>
        Mis Ofertas
      </h1>
      
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom-0 pt-3 px-4">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'received' ? 'active fw-bold text-green' : 'text-muted'}`}
                onClick={() => setActiveTab('received')}
              >
                <i className="bi bi-inbox-down me-2"></i>
                Recibidas
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'sent' ? 'active fw-bold text-green' : 'text-muted'}`}
                onClick={() => setActiveTab('sent')}
              >
                <i className="bi bi-send me-2"></i>
                Enviadas
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body p-4 bg-light">
          <OfferList type={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default MyOffers
