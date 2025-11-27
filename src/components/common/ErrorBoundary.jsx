import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger shadow-sm p-4">
            <h2 className="alert-heading fw-bold mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Algo salió mal
            </h2>
            <p className="lead">Se ha producido un error inesperado en la aplicación.</p>
            <hr />
            <details className="mb-3">
              <summary className="mb-2 fw-semibold cursor-pointer">Ver detalles del error</summary>
              <pre className="bg-light p-3 rounded border text-danger small">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button 
              className="btn btn-outline-danger"
              onClick={() => window.location.href = '/'}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Recargar Aplicación
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
