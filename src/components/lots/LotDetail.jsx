import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import * as lotService from '../../services/lotService'
import OfferForm from '../offers/OfferForm'
import './LotDetail.css'

const LotDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  const [lot, setLot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showOfferModal, setShowOfferModal] = useState(false)

  useEffect(() => {
    fetchLotDetails()
  }, [id])

  const fetchLotDetails = async () => {
    try {
      setLoading(true)
      // Try to fetch from API
      try {
        const data = await lotService.getLotById(id)
        setLot(data)
      } catch (err) {
        console.warn('API fetch failed, using mock data', err)
        // Mock data fallback
        setLot({
          id: parseInt(id),
          title: 'Soja de Primera Calidad',
          description: 'Lote de soja cosecha 2024, excelente calidad y rendimiento. Almacenada en silobolsa con condiciones óptimas de humedad y temperatura. Disponible para retiro inmediato. Análisis de calidad disponible a pedido.',
          price: 350000,
          quantity: 100,
          unit: 'TN',
          category: 'Granos',
          location: 'Rosario, Santa Fe',
          image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=1200&auto=format&fit=crop',
          createdAt: new Date().toISOString(),
          seller: {
            id: 1,
            name: 'Juan Agricultor',
            reputation: 4.8,
            completedTransactions: 15
          },
          specifications: [
            { label: 'Humedad', value: '13.5%' },
            { label: 'Impurezas', value: '1%' },
            { label: 'Daño', value: '0.5%' },
            { label: 'Cosecha', value: '2024' }
          ]
        })
      }
    } catch (err) {
      setError('Error al cargar los detalles del lote.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (loading) return <LoadingSpinner message="Cargando detalles..." />
  if (error) return <ErrorMessage message={error} />
  if (!lot) return <ErrorMessage message="Lote no encontrado" />

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{lot.title}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Left Column - Image */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm overflow-hidden rounded-4">
            <img 
              src={lot.image} 
              alt={lot.title} 
              className="img-fluid w-100 object-fit-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          <div className="mt-5">
            <h3 className="fw-bold mb-3">Descripción</h3>
            <p className="text-muted lead fs-6">{lot.description}</p>
            
            <h4 className="fw-bold mt-4 mb-3">Especificaciones</h4>
            <div className="row g-3">
              {lot.specifications?.map((spec, index) => (
                <div className="col-6 col-md-3" key={index}>
                  <div className="p-3 bg-light rounded-3 text-center">
                    <small className="text-muted d-block mb-1">{spec.label}</small>
                    <span className="fw-semibold">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details & Action */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                  {lot.category}
                </span>
                <span className="text-muted small">
                  Publicado {new Date(lot.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="fw-bold mb-2">{lot.title}</h1>
              
              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                <span className="text-muted">
                  {typeof lot.location === 'object' ? lot.location.dept : lot.location}
                </span>
              </div>

              <div className="mb-4 p-3 bg-light rounded-3">
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <small className="text-muted d-block mb-1">Precio por {lot.unit}</small>
                    <span className="display-6 fw-bold text-green">
                      {formatPrice(lot.price)}
                    </span>
                  </div>
                  <div className="text-end">
                    <small className="text-muted d-block mb-1">Disponible</small>
                    <span className="h4 fw-bold mb-0">
                      {lot.quantity} {lot.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="d-flex align-items-center mb-4 p-3 border rounded-3">
                <div className="bg-light rounded-circle p-3 me-3">
                  <i className="bi bi-person-fill fs-4 text-secondary"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">{lot.seller?.name}</h6>
                  <div className="d-flex align-items-center small">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span className="fw-bold me-1">{lot.seller?.reputation}</span>
                    <span className="text-muted">({lot.seller?.completedTransactions} ventas)</span>
                  </div>
                </div>
                <Link to={`/profile/${lot.seller?.id}`} className="btn btn-sm btn-outline-secondary ms-auto">
                  Ver Perfil
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                {isAuthenticated() ? (
                  <>
                    <button 
                      className="btn btn-primary btn-lg py-3 fw-bold shadow-sm"
                      onClick={() => setShowOfferModal(true)}
                    >
                      Hacer Oferta
                    </button>
                    <button className="btn btn-outline-success btn-lg py-3 fw-bold">
                      Contactar Vendedor
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-lg py-3 fw-bold">
                    Iniciar Sesión para Ofertar
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowOfferModal(false)}
                ></button>
              </div>
              <div className="modal-body px-4 pb-4">
                <OfferForm 
                  lotId={lot.id} 
                  lotTitle={lot.title}
                  onClose={() => setShowOfferModal(false)}
                  onSuccess={() => {
                    // Optional: refresh lot details or show success message
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LotDetail
