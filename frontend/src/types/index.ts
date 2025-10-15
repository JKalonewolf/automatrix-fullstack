// ------------------ User types ------------------

// Basic User type for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'customer'; // optional role
}

// Admin user type (can extend User if needed)
export interface AdminUser extends User {
  role: 'admin';
  userID: string;
}

// ------------------ Car type ------------------
export interface Car {
  _id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  description: string;
  actions?: string; // optional UI-only field
}

// ------------------ Customer type ------------------
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  actions?: string; // optional UI-only field
}

// ------------------ Service types ------------------

// Service type returned from backend (populated objects)
export interface Service {
  _id: string;
  customerId: string | Customer; // either ID or populated object
  carId: string | Car;           // either ID or populated object
  serviceType: string;
  notes?: string;
  status?: 'pending' | 'completed';
}

// Used when creating/updating (send IDs to backend)
export interface ServiceInput {
  customerId: string;    // string ID to send to backend
  carId: string;         // string ID to send to backend
  serviceType: string;
  notes?: string;
  status?: 'pending' | 'completed';
}
