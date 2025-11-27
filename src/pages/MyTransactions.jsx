import TransactionList from '../components/transactions/TransactionList'

const MyTransactions = () => {
  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">
        <i className="bi bi-receipt me-2 text-green"></i>
        Mis Transacciones
      </h1>
      
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <TransactionList />
        </div>
      </div>
    </div>
  )
}

export default MyTransactions
