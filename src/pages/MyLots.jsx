import { useState, useEffect } from 'react'
import LotForm from '../components/lots/LotForm'
import LotCard from '../components/lots/LotCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import * as lotService from '../services/lotService'

const MyLots = () => {
  const [lots, setLots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchMyLots()
  }, [])

  const fetchMyLots = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await lotService.getMyLots()
      setLots(data || [])
    } catch (err) {
      console.error('Error fetching lots:', err)
      setError('Error al cargar tus lotes. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLot = async (lotData) => {
    try {
      await lotService.createLot(lotData)
      setShowModal(false)
      setSuccessMessage('¡Lote creado exitosamente!')
      
      // Refresh the lots list
      await fetchMyLots()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (err) {
      console.error('Error creating lot:', err)
      throw new Error(err.response?.data?.error || 'Error al crear el lote')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  if (loading) {
    return <LoadingSpinner message="Cargando tus lotes..." />
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">
          <i className="bi bi-box-seam me-2 text-green"></i>
          Mis Lotes
        </h1>
        {lots.length > 0 && (
          <button className="btn btn-primary" onClick={handleOpenModal}>
            <i className="bi bi-plus-circle me-2"></i>
            Crear Nuevo Lote
          </button>
        )}
      </div>

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!error && lots.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
            <p className="text-muted mt-3 mb-0">No tienes lotes creados aún</p>
            <button className="btn btn-primary mt-3" onClick={handleOpenModal}>
              <i className="bi bi-plus-circle me-2"></i>
              Crear Primer Lote
            </button>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {lots.map(lot => (
            <div className="col" key={lot.id}>
              <LotCard lot={lot} />
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating lot */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-plus-circle me-2"></i>
                  Crear Nuevo Lote
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <LotForm onSubmit={handleCreateLot} onCancel={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyLots
