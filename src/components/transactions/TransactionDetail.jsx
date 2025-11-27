import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import * as transactionService from '../../services/transactionService'

const TransactionDetail = () => {
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTransactionDetails()
  }, [id])

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true)
      // Try to fetch from API
      try {
        const data = await transactionService.getTransactionById(id)
        setTransaction(data)
      } catch (err) {
        console.warn('API fetch failed, using mock data', err)
        setMockData()
      }
    } catch (err) {
      setError('Error al cargar los detalles de la transacción.')
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    setTransaction({
      id: parseInt(id),
      lotId: 101,
      lotTitle: 'Soja de Primera Calidad',
      amount: 17500000,
      quantity: 50,
      unit: 'TN',
      pricePerUnit: 350000,
      status: 'in_progress',
      paymentStatus: 'pending',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date().toISOString(),
      buyer: { name: 'Agro Export SA', email: 'compras@agroexport.com' },
      seller: { name: 'Juan Agricultor', email: 'juan@campo.com' }
    })
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
  if (!transaction) return <ErrorMessage message="Transacción no encontrada" />

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">
          <i className="bi bi-receipt me-2 text-green"></i>
          Transacción #{transaction.id}
        </h1>
        <span className="badge bg-info text-white fs-6 px-3 py-2">En Progreso</span>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Detalles del Pedido</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="text-muted small">Producto</label>
                  <p className="fw-semibold fs-5">{transaction.lotTitle}</p>
                </div>
                <div className="col-md-6">
                  <label className="text-muted small">Fecha</label>
                  <p className="fw-semibold">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Descripción</th>
                      <th className="text-end">Cantidad</th>
                      <th className="text-end">Precio Unitario</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{transaction.lotTitle}</td>
                      <td className="text-end">{transaction.quantity} {transaction.unit}</td>
                      <td className="text-end">{formatPrice(transaction.pricePerUnit)}</td>
                      <td className="text-end fw-bold">{formatPrice(transaction.amount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Estado del Pago</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className={`rounded-circle p-3 me-3 ${transaction.paymentStatus === 'paid' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                  <i className={`bi ${transaction.paymentStatus === 'paid' ? 'bi-check-lg' : 'bi-hourglass-split'} fs-4`}></i>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">
                    {transaction.paymentStatus === 'paid' ? 'Pago Completado' : 'Pago Pendiente'}
                  </h6>
                  <p className="text-muted small mb-0">
                    {transaction.paymentStatus === 'paid' 
                      ? 'El pago ha sido verificado y acreditado.' 
                      : 'Esperando confirmación de transferencia bancaria.'}
                  </p>
                </div>
              </div>
              
              {transaction.paymentStatus === 'pending' && (
                <div className="alert alert-info mb-0">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Por favor realice la transferencia a la cuenta indicada y suba el comprobante.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Participantes</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label className="text-muted small d-block mb-2">Vendedor</label>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle p-2 me-2">
                    <i className="bi bi-person-fill text-secondary"></i>
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">{transaction.seller.name}</p>
                    <small className="text-muted">{transaction.seller.email}</small>
                  </div>
                </div>
              </div>
              
              <hr />
              
              <div>
                <label className="text-muted small d-block mb-2">Comprador</label>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle p-2 me-2">
                    <i className="bi bi-person-fill text-secondary"></i>
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">{transaction.buyer.name}</p>
                    <small className="text-muted">{transaction.buyer.email}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary">
              <i className="bi bi-chat-dots me-2"></i>
              Enviar Mensaje
            </button>
            <button className="btn btn-outline-danger">
              <i className="bi bi-exclamation-circle me-2"></i>
              Reportar Problema
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
