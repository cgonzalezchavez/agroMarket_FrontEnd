import { useState } from 'react'
import ErrorMessage from '../common/ErrorMessage'
import SuccessMessage from '../common/SuccessMessage'
import * as reputationService from '../../services/reputationService'
import './RatingForm.css'

const RatingForm = ({ transactionId, targetUserId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Por favor selecciona una calificación')
      return
    }

    setLoading(true)
    setError('')

    try {
      // await reputationService.submitRating({ transactionId, targetUserId, rating, comment })
      setSuccess('Calificación enviada exitosamente')
      setTimeout(() => {
        if (onSuccess) onSuccess()
        if (onClose) onClose()
      }, 2000)
    } catch (err) {
      setError('Error al enviar la calificación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rating-form">
      <h5 className="mb-3">Calificar Usuario</h5>
      
      <ErrorMessage message={error} onClose={() => setError('')} />
      <SuccessMessage message={success} onClose={() => setSuccess('')} />

      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <div className="rating-stars mb-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="d-none"
                  />
                  <i 
                    className={`bi bi-star-fill star-icon ${ratingValue <= (hover || rating) ? 'text-warning' : 'text-secondary'}`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    style={{ fontSize: '2rem', cursor: 'pointer', margin: '0 5px' }}
                  ></i>
                </label>
              )
            })}
          </div>
          <p className="text-muted small">Haz clic en las estrellas para calificar</p>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comentario</label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe tu experiencia con este usuario..."
            required
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
            {loading ? 'Enviando...' : 'Enviar Calificación'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RatingForm
