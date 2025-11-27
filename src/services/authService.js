import apiClient from '../config/api'

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password })
  return response.data
}

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData)
  return response.data
}

export const logout = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data
}

export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh')
  return response.data
}
