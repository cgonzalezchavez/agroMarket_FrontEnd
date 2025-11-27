import apiClient from '../config/api'

export const getAllUsers = async () => {
  const response = await apiClient.get('/users')
  return response.data
}

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await apiClient.put(`/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`)
  return response.data
}

export const getUserProfile = async () => {
  const response = await apiClient.get('/users/profile')
  return response.data
}

export const updateUserProfile = async (userData) => {
  const response = await apiClient.put('/users/profile', userData)
  return response.data
}
