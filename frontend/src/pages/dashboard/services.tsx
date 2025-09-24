import { useEffect, useState } from 'react'
import { Service, ServiceInput, Customer, Car } from '@/types'
import * as serviceService from '@/services/serviceService'
import * as customerService from '@/services/customerService'
import * as carService from '@/services/carService'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

interface FormState {
  customerId: string | Customer
  carId: string | Car
  serviceType: string
  notes?: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editService, setEditService] = useState<Service | null>(null)
  const [form, setForm] = useState<FormState>({
    customerId: '',
    carId: '',
    serviceType: '',
    notes: ''
  })

  // Fetch services
  const fetchServices = async () => {
    const res = await serviceService.getServices()
    setServices(res.data)
  }

  // Fetch customers and cars for dropdowns
  const fetchCustomersAndCars = async () => {
    const [custRes, carRes] = await Promise.all([
      customerService.getCustomers(),
      carService.getCars()
    ])
    setCustomers(custRes.data)
    setCars(carRes.data)
  }

  useEffect(() => {
    fetchServices()
    fetchCustomersAndCars()
  }, [])

  const openAddModal = () => {
    setEditService(null)
    setForm({ customerId: '', carId: '', serviceType: '', notes: '' })
    setModalOpen(true)
  }

  const openEditModal = (service: Service) => {
    setEditService(service)
    setForm({
      customerId: service.customerId,
      carId: service.carId,
      serviceType: service.serviceType,
      notes: service.notes || ''
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await serviceService.deleteService(id)
      fetchServices()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: ServiceInput = {
      customerId:
        typeof form.customerId === 'string' ? form.customerId : form.customerId._id,
      carId: typeof form.carId === 'string' ? form.carId : form.carId._id,
      serviceType: form.serviceType,
      notes: form.notes
    }

    if (editService) {
      await serviceService.updateService(editService._id, payload)
    } else {
      await serviceService.createService(payload)
    }

    setModalOpen(false)
    fetchServices()
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-black via-blue-900 to-purple-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />

          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">🛠 Services</h1>
            <button
              onClick={openAddModal}
              className="bg-purple-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform"
            >
              + Add Service
            </button>
          </div>

          {/* Services Table */}
          <div className="overflow-x-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl shadow-black/50">
            <table className="min-w-full text-white">
              <thead className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left"></th>
                  <th className="py-3 px-4 text-left">Service Type</th>
                  <th className="py-3 px-4 text-left">Notes</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s._id} className="border-b border-white/10 hover:bg-white/10 transition">
                    <td>
                      {typeof s.customerId === 'string'
                        ? s.customerId
                        : s.customerId.name}
                    </td>
                    <td>
                      {typeof s.carId === 'string' ? s.carId : s.carId.name}
                    </td>
                    <td>{s.serviceType}</td>
                    <td>{s.notes}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-xl font-semibold shadow-lg shadow-yellow-400/40 hover:scale-105 transition-transform"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-xl font-semibold shadow-lg shadow-red-500/40 hover:scale-105 transition-transform"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/50">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editService ? 'Edit Service' : 'Add Service'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <select
                    value={typeof form.customerId === 'string' ? form.customerId : form.customerId._id}
                    onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((c) => (
                     <option key={c._id} value={c._id} className="text-black">
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={typeof form.carId === 'string' ? form.carId : form.carId._id}
                    onChange={(e) => setForm({ ...form, carId: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  >
                    <option value="">Select Car</option>
                    {cars.map((c) => (
                      <option key={c._id} value={c._id} className="text-black">
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Service Type"
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />

                  <textarea
                    placeholder="Notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60 min-h-[100px]"
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
                      {editService ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
