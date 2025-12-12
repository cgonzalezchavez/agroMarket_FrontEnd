import { useState } from 'react'
import PropTypes from 'prop-types'

const LotForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    commodity_code: initialData?.commodity_code || '',
    variety: initialData?.variety || '',
    quantity: initialData?.quantity || '',
    unit: initialData?.unit || 'TN',
    price_base: initialData?.price_base || '',
    location: {
      dept: initialData?.location?.dept || '',
      city: initialData?.location?.city || ''
    },
    quality: initialData?.quality || {}
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Available commodities from backend
  const commodities = [
    { code: 'RICE', name: 'Arroz' },
    { code: 'SOY', name: 'Soja' },
    { code: 'CORN', name: 'Maíz' },
    { code: 'CATTLE', name: 'Ganado' }
  ]

  const units = ['TN', 'KG', 'UNIDAD', 'CABEZA']

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('location.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.commodity_code) {
      newErrors.commodity_code = 'Selecciona un commodity'
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0'
    }

    if (!formData.price_base || formData.price_base <= 0) {
      newErrors.price_base = 'El precio debe ser mayor a 0'
    }

    if (!formData.location.dept) {
      newErrors['location.dept'] = 'El departamento es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Convert string values to numbers
      const submitData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        price_base: parseFloat(formData.price_base)
      }

      await onSubmit(submitData)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: error.message || 'Error al crear el lote' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lot-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="commodity_code" className="form-label">
            Commodity <span className="text-danger">*</span>
          </label>
          <select
            id="commodity_code"
            name="commodity_code"
            className={`form-select ${errors.commodity_code ? 'is-invalid' : ''}`}
            value={formData.commodity_code}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            {commodities.map(commodity => (
              <option key={commodity.code} value={commodity.code}>
                {commodity.name}
              </option>
            ))}
          </select>
          {errors.commodity_code && (
            <div className="invalid-feedback">{errors.commodity_code}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="variety" className="form-label">
            Variedad
          </label>
          <input
            type="text"
            id="variety"
            name="variety"
            className="form-control"
            value={formData.variety}
            onChange={handleChange}
            placeholder="Ej: variedad A, variedad B..."
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="quantity" className="form-label">
            Cantidad <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
          {errors.quantity && (
            <div className="invalid-feedback">{errors.quantity}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="unit" className="form-label">
            Unidad <span className="text-danger">*</span>
          </label>
          <select
            id="unit"
            name="unit"
            className="form-select"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            {units.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="price_base" className="form-label">
          Precio Base (por unidad) <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">Gs.</span>
          <input
            type="number"
            id="price_base"
            name="price_base"
            className={`form-control ${errors.price_base ? 'is-invalid' : ''}`}
            value={formData.price_base}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
          {errors.price_base && (
            <div className="invalid-feedback">{errors.price_base}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="location.dept" className="form-label">
            Departamento <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="location.dept"
            name="location.dept"
            className={`form-control ${errors['location.dept'] ? 'is-invalid' : ''}`}
            value={formData.location.dept}
            onChange={handleChange}
            placeholder="Ej: Misiones, San Pedro..."
            required
          />
          {errors['location.dept'] && (
            <div className="invalid-feedback">{errors['location.dept']}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="location.city" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            id="location.city"
            name="location.city"
            className="form-control"
            value={formData.location.city}
            onChange={handleChange}
            placeholder="Ej: San Juan, San Pedro..."
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creando...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              {initialData ? 'Actualizar Lote' : 'Crear Lote'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}

LotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.object
}

export default LotForm
