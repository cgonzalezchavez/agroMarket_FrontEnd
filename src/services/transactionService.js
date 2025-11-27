import apiClient from '../config/api'

export const getAllTransactions = async () => {
  const response = await apiClient.get('/transactions')
  return response.data
}

export const getTransactionById = async (id) => {
  const response = await apiClient.get(`/transactions/${id}`)
  return response.data
}

export const createTransaction = async (transactionData) => {
  const response = await apiClient.post('/transactions', transactionData)
  return response.data
}

export const updateTransaction = async (id, transactionData) => {
  const response = await apiClient.put(`/transactions/${id}`, transactionData)
  return response.data
}

export const getMyTransactions = async () => {
  const response = await apiClient.get('/transactions/my-transactions')
  return response.data
}

export const updatePaymentStatus = async (id, status) => {
  const response = await apiClient.patch(`/transactions/${id}/payment-status`, { status })
  return response.data
}

export const confirmDelivery = async (id) => {
  const response = await apiClient.post(`/transactions/${id}/confirm-delivery`)
  return response.data
}
