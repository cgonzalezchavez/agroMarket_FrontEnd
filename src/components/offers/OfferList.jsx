import { useState, useEffect } from 'react'
import OfferCard from './OfferCard'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import * as offerService from '../../services/offerService'

const OfferList = ({ type = 'received' }) => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOffers()
  }, [type])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      // Try to fetch from API
      try {
        const data = type === 'received' 
          ? await offerService.getReceivedOffers()
          : await offerService.getSentOffers()
          
        if (data && data.length > 0) {
          setOffers(data)
        } else {
          setMockData()
        }
      } catch (err) {
        console.warn('API fetch failed, using mock data', err)
        setMockData()
      }
    } catch (err) {
      setError('Error al cargar las ofertas.')
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    const mockOffers = [
      {
        id: 1,
        lotId: 101,
        lotTitle: 'Soja de Primera Calidad',
        amount: 340000,
        quantity: 50,
        unit: 'TN',
        status: 'pending',
        createdAt: new Date().toISOString(),
        buyerName: 'Comprador Ejemplo'
      },
      {
        id: 2,
        lotId: 102,
        lotTitle: 'Maíz Pisingallo',
        amount: 275000,
        quantity: 25,
        unit: 'TN',
        status: 'accepted',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        buyerName: 'Agro Export SA'
      }
    ]
    setOffers(mockOffers)
  }

  const handleAccept = async (id) => {
    try {
      // await offerService.acceptOffer(id)
      // Update local state
      setOffers(offers.map(offer => 
        offer.id === id ? { ...offer, status: 'accepted' } : offer
      ))
    } catch (error) {
      setError('Error al aceptar la oferta')
    }
  }

  const handleReject = async (id) => {
    try {
      // await offerService.rejectOffer(id)
      // Update local state
      setOffers(offers.map(offer => 
        offer.id === id ? { ...offer, status: 'rejected' } : offer
      ))
    } catch (error) {
      setError('Error al rechazar la oferta')
    }
  }

  if (loading) return <LoadingSpinner message="Cargando ofertas..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="offer-list">
      {offers.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3 text-muted mb-0">
            No tienes ofertas {type === 'received' ? 'recibidas' : 'enviadas'}.
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {offers.map(offer => (
            <div className="col" key={offer.id}>
              <OfferCard 
                offer={offer} 
                isReceived={type === 'received'}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OfferList
