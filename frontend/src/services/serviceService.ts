import api from './api';
import { Service } from '@/types';

export const getServices = () => api.get<Service[]>('/services');
export const getService = (id: string) => api.get<Service>(`/services/${id}`);
export const createService = (data: Partial<Service>) => api.post('/services', data);
export const updateService = (id: string, data: Partial<Service>) => api.put(`/services/${id}`, data);
export const deleteService = (id: string) => api.delete(`/services/${id}`);
