import apiClient from '../config/api'

export const getAllOffers = async () => {
  const response = await apiClient.get('/offers')
  return response.data
}

export const getOfferById = async (id) => {
  const response = await apiClient.get(`/offers/${id}`)
  return response.data
}

export const createOffer = async (offerData) => {
  const response = await apiClient.post('/offers', offerData)
  return response.data
}

export const updateOffer = async (id, offerData) => {
  const response = await apiClient.put(`/offers/${id}`, offerData)
  return response.data
}

export const deleteOffer = async (id) => {
  const response = await apiClient.delete(`/offers/${id}`)
  return response.data
}

export const acceptOffer = async (id) => {
  const response = await apiClient.post(`/offers/${id}/accept`)
  return response.data
}

export const rejectOffer = async (id) => {
  const response = await apiClient.post(`/offers/${id}/reject`)
  return response.data
}

export const getMyOffers = async () => {
  const response = await apiClient.get('/offers/my-offers')
  return response.data
}

export const getReceivedOffers = async () => {
  const response = await apiClient.get('/offers/received')
  return response.data
}

export const getSentOffers = async () => {
  const response = await apiClient.get('/offers/sent')
  return response.data
}
