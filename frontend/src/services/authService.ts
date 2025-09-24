// src/services/authService.ts
import axios from 'axios'

// Use .env for flexibility
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://automatrix-backend.onrender.com/api/auth'

// ✅ Login
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email: email.trim().toLowerCase(),
    password,
  })
  return response.data // return { user, token }
}

// ✅ Register
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
    role,
  })
  return response.data // return { user, token }
}
