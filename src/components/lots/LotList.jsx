import { useState, useEffect } from 'react'
import LotCard from './LotCard'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import * as lotService from '../../services/lotService'

const LotList = () => {
  const [lots, setLots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  })

  useEffect(() => {
    fetchLots()
  }, [])

  const fetchLots = async () => {
    try {
      setLoading(true)
      try {
        const data = await lotService.getAllLots()
        if (data && data.length > 0) {
          setLots(data)
        } else {
          setMockData()
        }
      } catch (err) {
        console.warn('API connection failed, using mock data', err)
        setMockData()
      }
    } catch (err) {
      setError('Error al cargar los lotes. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    setLots([
      {
        id: 1,
        title: 'Soja de Primera Calidad',
        description: 'Lote de soja cosecha 2024, excelente calidad y rendimiento. Almacenada en silobolsa.',
        price: 350000,
        quantity: 100,
        unit: 'TN',
        category: 'Granos',
        location: 'Rosario, Santa Fe',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=600&auto=format&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Maíz Pisingallo',
        description: 'Maíz para pisingallo, variedad especial. Ideal para exportación.',
        price: 280000,
        quantity: 50,
        unit: 'TN',
        category: 'Granos',
        location: 'Córdoba, Córdoba',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        title: 'Trigo Pan',
        description: 'Trigo pan con alto contenido de gluten. Listo para retirar.',
        price: 220000,
        quantity: 200,
        unit: 'TN',
        category: 'Cereales',
        location: 'Pergamino, Buenos Aires',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 4,
        title: 'Semillas de Girasol',
        description: 'Semillas de girasol confitero, calibre grande.',
        price: 450000,
        quantity: 30,
        unit: 'TN',
        category: 'Semillas',
        location: 'Necochea, Buenos Aires',
        image: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=600&auto=format&fit=crop',
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ])
  }

  if (loading) {
    return <LoadingSpinner message="Cargando lotes disponibles..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="lot-list-container">
      {lots.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3 text-muted">No se encontraron lotes disponibles.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {lots.map(lot => (
            <div className="col" key={lot.id}>
              <LotCard lot={lot} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LotList
