const MyLots = () => {
  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">
        <i className="bi bi-box-seam me-2 text-green"></i>
        Mis Lotes
      </h1>
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="text-muted mt-3 mb-0">No tienes lotes creados aún</p>
          <button className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Primer Lote
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyLots
