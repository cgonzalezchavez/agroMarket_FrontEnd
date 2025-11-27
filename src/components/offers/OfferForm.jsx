import { useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import SuccessMessage from '../common/SuccessMessage'
import * as offerService from '../../services/offerService'

const OfferForm = ({ lotId, lotTitle, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    quantity: '',
    comments: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // await offerService.createOffer({ ...formData, lotId })
      setSuccess('Oferta enviada exitosamente')
      setTimeout(() => {
        if (onSuccess) onSuccess()
        if (onClose) onClose()
      }, 2000)
    } catch (err) {
      setError('Error al enviar la oferta. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="offer-form">
      <h4 className="mb-4">Realizar Oferta</h4>
      <p className="text-muted mb-4">
        Estás ofertando por: <strong>{lotTitle}</strong>
      </p>

      <ErrorMessage message={error} onClose={() => setError('')} />
      <SuccessMessage message={success} onClose={() => setSuccess('')} />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Precio Oferta (por unidad)</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Comentarios (Opcional)</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            rows="3"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-2">
          {onClose && (
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Oferta'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OfferForm
