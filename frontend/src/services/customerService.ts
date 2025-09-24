import axios from 'axios'
import { Customer } from '@/types'


const API_URL = 'https://automatrix-backend.onrender.com/api'

// Helper to include JWT token
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } }
    }
  }
  return {}
}

export const getCustomers = () =>
  axios.get<Customer[]>(`${API_URL}/customers`, getAuthHeaders())

export const getCustomer = (id: string) =>
  axios.get<Customer>(`${API_URL}/customers/${id}`, getAuthHeaders())

export const createCustomer = (data: Partial<Customer>) =>
  axios.post(`${API_URL}/customers`, data, getAuthHeaders())

export const updateCustomer = (id: string, data: Partial<Customer>) =>
  axios.put(`${API_URL}/customers/${id}`, data, getAuthHeaders())

export const deleteCustomer = (id: string) =>
  axios.delete(`${API_URL}/customers/${id}`, getAuthHeaders())
