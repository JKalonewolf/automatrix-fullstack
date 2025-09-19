// src/services/authService.ts
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

// Login remains the same
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email: email.trim().toLowerCase(),
    password,
  })
  return response.data // ✅ only return { user, token }
}

// Updated register to accept role
export const register = async (
  name: string,
  email: string,
  password: string,
  role: string = 'customer' // default role
) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email: email.trim().toLowerCase(),
    password,
    role, // send role to backend
  })
  return response.data // ✅ only return { user, token }
}
