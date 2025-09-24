// src/services/authService.ts
import axios from 'axios'

// authService.ts
const API_URL = 'https://automatrix-h2js.onrender.com//api/auth'

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
