import './LoadingSpinner.css'

const LoadingSpinner = ({ size = 'medium', message = 'Cargando...' }) => {
  const sizeClass = {
    small: 'spinner-sm',
    medium: 'spinner-md',
    large: 'spinner-lg'
  }[size]

  return (
    <div className="loading-spinner-container">
      <div className={`spinner-custom ${sizeClass}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
