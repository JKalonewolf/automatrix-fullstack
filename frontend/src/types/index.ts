// User type for authentication
export interface User {
  id: string
  name: string
  email: string
}

// Car type
export interface Car {
  _id: string
  name: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  actions: string
  fuelType: string
  description: string
// optional, since backend allows images
}


// Customer type
export interface Customer {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  action: string
  
}

// Service type
export interface Service {
  _id: string;
  customerId: string | Customer; // <-- either ID or populated object
  carId: Car |string;           // <-- either ID or populated object
  serviceType: string;
  notes?: string;
  status?: 'pending' | 'completed';
}

// Returned from backend (with populated objects)

// Used when creating/updating (with string IDs)
export interface ServiceInput {
  customerId: string;    // string ID to send to backend
  carId: string;         // string ID to send to backend
  serviceType: string;
  notes?: string;
  status?: 'pending' | 'completed';
}

// Admin user type
export interface User {
  id: string
  userID: string
  name: string
  email: string
  role: 'admin' | 'customer'
}
