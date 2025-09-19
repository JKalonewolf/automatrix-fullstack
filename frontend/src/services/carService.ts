import axios from 'axios'
import { Car } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://automatrix-h2js.onrender.com/api'

// ✅ helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

export const getCars = () => axios.get<Car[]>(`${API_URL}/cars`, getAuthHeaders())
export const getCar = (id: string) => axios.get<Car>(`${API_URL}/cars/${id}`, getAuthHeaders())
export const createCar = (data: Partial<Car>) => axios.post(`${API_URL}/cars`, data, getAuthHeaders())
export const updateCar = (id: string, data: Partial<Car>) => axios.put(`${API_URL}/cars/${id}`, data, getAuthHeaders())
export const deleteCar = (id: string) => axios.delete(`${API_URL}/cars/${id}`, getAuthHeaders())
