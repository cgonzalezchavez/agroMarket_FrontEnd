import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import * as transactionService from '../../services/transactionService'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      // Try to fetch from API
      try {
        const data = await transactionService.getMyTransactions()
        if (data && data.length > 0) {
          setTransactions(data)
        } else {
          setMockData()
        }
      } catch (err) {
        console.warn('API fetch failed, using mock data', err)
        setMockData()
      }
    } catch (err) {
      setError('Error al cargar las transacciones.')
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    setTransactions([
      {
        id: 1,
        lotTitle: 'Soja de Primera Calidad',
        amount: 17500000,
        quantity: 50,
        unit: 'TN',
        status: 'completed',
        paymentStatus: 'paid',
        date: new Date(Date.now() - 604800000).toISOString(),
        counterparty: 'Agro Export SA'
      },
      {
        id: 2,
        lotTitle: 'Maíz Pisingallo',
        amount: 6875000,
        quantity: 25,
        unit: 'TN',
        status: 'in_progress',
        paymentStatus: 'pending',
        date: new Date(Date.now() - 172800000).toISOString(),
        counterparty: 'Juan Agricultor'
      }
    ])
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning text-dark',
      in_progress: 'bg-info text-white',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    }
    
    const labels = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      completed: 'Completada',
      cancelled: 'Cancelada'
    }

    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (loading) return <LoadingSpinner message="Cargando transacciones..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="transaction-list">
      {transactions.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <i className="bi bi-receipt text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3 text-muted mb-0">No tienes transacciones registradas.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Lote</th>
                <th>Contraparte</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="fw-semibold">{tx.lotTitle}</td>
                  <td>{tx.counterparty}</td>
                  <td className="text-green fw-bold">{formatPrice(tx.amount)}</td>
                  <td>{getStatusBadge(tx.status)}</td>
                  <td>
                    <Link to={`/transactions/${tx.id}`} className="btn btn-sm btn-outline-primary">
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TransactionList
