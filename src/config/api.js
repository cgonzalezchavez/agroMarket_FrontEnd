import axios from 'axios'

// API Base URL
export const API_BASE_URL = 'http://localhost:8080/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Only redirect if not already on login page to avoid loops
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
      
      // Return error message from server or default message
      const errorMessage = data?.message || data?.error || 'An error occurred'
      return Promise.reject(new Error(errorMessage))
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('No response from server. Please check your connection.'))
    } else {
      // Something else happened
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'))
    }
  }
)

export default apiClient
