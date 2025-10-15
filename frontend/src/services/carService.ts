import axios, { AxiosResponse } from 'axios';
import { Car } from '@/types'; // your Car interface

const API_URL = "https://automatrix-h2js.onrender.com/api/cars";

// Get all cars
export const getCars = (): Promise<AxiosResponse<Car[]>> => axios.get<Car[]>(`${API_URL}`);

// Get a single car by ID
export const getCarById = (id: string): Promise<AxiosResponse<Car>> =>
  axios.get<Car>(`${API_URL}/${id}`);

// Create a new car (requires token)
export const createCar = (carData: Omit<Car, '_id'>, token?: string): Promise<AxiosResponse<Car>> =>
  axios.post<Car>(`${API_URL}`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update a car
export const updateCar = (id: string, carData: Partial<Omit<Car, '_id'>>, token?: string): Promise<AxiosResponse<Car>> =>
  axios.put<Car>(`${API_URL}/${id}`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete a car
export const deleteCar = (id: string, token?: string): Promise<AxiosResponse<{ message: string }>> =>
  axios.delete<{ message: string }>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
