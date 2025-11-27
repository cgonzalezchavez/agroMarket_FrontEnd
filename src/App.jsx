import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './pages/Dashboard'
import MyLots from './pages/MyLots'
import MyOffers from './pages/MyOffers'
import MyTransactions from './pages/MyTransactions'
import Profile from './components/user/Profile'
import LotDetail from './components/lots/LotDetail'
import TransactionDetail from './components/transactions/TransactionDetail'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lots/:id" element={<LotDetail />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/my-lots" element={
              <ProtectedRoute>
                <MyLots />
              </ProtectedRoute>
            } />
            <Route path="/my-offers" element={
              <ProtectedRoute>
                <MyOffers />
              </ProtectedRoute>
            } />
            <Route path="/my-transactions" element={
              <ProtectedRoute>
                <MyTransactions />
              </ProtectedRoute>
            } />
            <Route path="/transactions/:id" element={
              <ProtectedRoute>
                <TransactionDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App
