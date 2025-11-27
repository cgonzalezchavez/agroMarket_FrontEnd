import apiClient from '../config/api'

export const getAllLots = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await apiClient.get(`/lots?${params}`)
  return response.data
}

export const getLotById = async (id) => {
  const response = await apiClient.get(`/lots/${id}`)
  return response.data
}

export const createLot = async (lotData) => {
  const response = await apiClient.post('/lots', lotData)
  return response.data
}

export const updateLot = async (id, lotData) => {
  const response = await apiClient.put(`/lots/${id}`, lotData)
  return response.data
}

export const deleteLot = async (id) => {
  const response = await apiClient.delete(`/lots/${id}`)
  return response.data
}

export const getMyLots = async () => {
  const response = await apiClient.get('/lots/my-lots')
  return response.data
}

export const searchLots = async (searchTerm) => {
  const response = await apiClient.get(`/lots/search?q=${searchTerm}`)
  return response.data
}
