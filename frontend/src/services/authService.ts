// src/services/authService.ts
import axios from 'axios'

// ✅ Always point to the correct backend route
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://automatrix-h2js.onrender.com/api/auth'

// ✅ Axios instance (optional but cleaner)
const api = axios.create({
  baseURL: API_URL,
})

// Login
export const login = async (email: string, password: string) => {
  const response = await api.post('/login', {
    email: email.trim().toLowerCase(),
    password,
  })
  return response.data // { user, token }
}

// Register
export const register = async (
  name: string,
  email: string,
  password: string,
  role: string = 'customer'
) => {
  const response = await api.post('/register', {
    name,
    email: email.trim().toLowerCase(),
    password,
    role,
  })
  return response.data // { user, token }
}
