import apiClient from '../config/api'

export const getUserReputation = async (userId) => {
  const response = await apiClient.get(`/reputation/user/${userId}`)
  return response.data
}

export const getMyReputation = async () => {
  const response = await apiClient.get('/reputation/my-reputation')
  return response.data
}

export const submitRating = async (ratingData) => {
  const response = await apiClient.post('/reputation/rate', ratingData)
  return response.data
}

export const getReputationHistory = async (userId) => {
  const response = await apiClient.get(`/reputation/history/${userId}`)
  return response.data
}

export const getMyReputationHistory = async () => {
  const response = await apiClient.get('/reputation/my-history')
  return response.data
}
