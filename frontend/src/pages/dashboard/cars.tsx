import { useEffect, useState } from 'react';
import { Car } from '@/types';
import * as carService from '@/services/carService';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {jwtDecode} from 'jwt-decode';

interface FormState {
  _id?: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  description: string;
  actions?: string;
}

interface DecodedToken {
  role: string;
  [key: string]: unknown;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: '',
    description: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchCars();

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setIsAdmin(decoded.role === 'admin');
    }
  }, []);

  const fetchCars = async (): Promise<void> => {
    const res = await carService.getCars();
    setCars(res.data);
  };

  const openAddModal = (): void => {
    if (!isAdmin) return alert('You do not have permission to add a car.');
    setEditCar(null);
    setForm({
      name: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: '',
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (car: Car): void => {
    if (!isAdmin) return alert('You do not have permission to edit a car.');
    setEditCar(car);
    setForm({
      _id: car._id,
      name: car.name,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      description: car.description,
      actions: car.actions,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!isAdmin) return alert('You do not have permission to delete a car.');
    if (confirm('Are you sure you want to delete this car?')) {
      await carService.deleteCar(id);
      fetchCars();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('You do not have permission.');
      const payload: Omit<Car, '_id'> = {
        ...form,
        actions: form.actions || '',
      };
      if (editCar && editCar._id) {
        await carService.updateCar(editCar._id, payload);
      } else {
        await carService.createCar(payload);
      }
      setModalOpen(false);
      fetchCars();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Error submitting form');
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-black via-blue-900 to-purple-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />

          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">🚘 Cars</h1>
            {isAdmin && (
              <button
                onClick={openAddModal}
                className="bg-purple-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform"
              >
                + Add Car
              </button>
            )}
          </div>

          {/* Cars Table */}
          <div className="overflow-x-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl shadow-black/50">
            <table className="min-w-full text-white">
              <thead className="bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-t-3xl">
                <tr>
                  <th className="py-3 px-3 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Make</th>
                  <th className="py-3 px-4 text-left">Model</th>
                  <th className="py-3 px-4 text-left">Year</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Fuel Type</th>
                  <th className="py-3 px-4 text-left">Mileage</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="border-b border-white/10 hover:bg-white/10 transition">
                    <td className="py-3 px-4">{car.name}</td>
                    <td className="py-3 px-4">{car.make}</td>
                    <td className="py-3 px-4">{car.model}</td>
                    <td className="py-3 px-4">{car.year}</td>
                    <td className="py-3 px-4">{car.price}</td>
                    <td className="py-3 px-4">{car.fuelType}</td>
                    <td className="py-3 px-4">{car.mileage}</td>
                    <td className="py-3 px-1 flex gap-3">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => openEditModal(car)}
                            className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold shadow-lg shadow-yellow-400/40 hover:scale-105 transition-transform"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-red-500/40 hover:scale-105 transition-transform"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {modalOpen && isAdmin && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/50">
                <h2 className="text-2xl font-bold text-white mb-6">{editCar ? 'Edit Car' : 'Add Car'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="text"
                    placeholder="Make"
                    value={form.make}
                    onChange={(e) => setForm({ ...form, make: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="text"
                    placeholder="Model"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="number"
                    placeholder="Mileage"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <select
                    value={form.fuelType}
                    onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Gas">Gas</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-400/40 text-white px-4 py-2 rounded-xl hover:bg-gray-500/60 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform"
                    >
                      {editCar ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
