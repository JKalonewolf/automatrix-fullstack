import axios from 'axios';
import { Customer } from '@/types';

const API_URL = 'https://automatrix-h2js.onrender.com/api/customers';

// Helper to include JWT token
const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
  }
  return {};
};

// ✅ Get all customers
export const getCustomers = () =>
  axios.get<Customer[]>(API_URL, getAuthHeaders());

// ✅ Get customer by ID
export const getCustomer = (id: string) =>
  axios.get<Customer>(`${API_URL}/${id}`, getAuthHeaders());

// ✅ Create a new customer
export const createCustomer = (data: Partial<Customer>) =>
  axios.post(API_URL, data, getAuthHeaders());

// ✅ Update a customer
export const updateCustomer = (id: string, data: Partial<Customer>) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeaders());

// ✅ Delete a customer
export const deleteCustomer = (id: string) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeaders());
