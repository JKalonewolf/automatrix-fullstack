import { useEffect, useState } from 'react'
import { Customer } from '@/types'
import * as customerService from '@/services/customerService'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { AxiosError } from 'axios';

interface FormState {
  name: string
  email: string
  phone: string
  address: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const fetchCustomers = async () => {
  try {
    const res = await customerService.getCustomers();
    setCustomers(res.data);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error('Error fetching customers:', error);
    alert(error.response?.data?.message || 'Failed to fetch customers');
  }
};


  useEffect(() => {
    fetchCustomers()
  }, [])

  const openAddModal = () => {
    setEditCustomer(null)
    setForm({ name: '', email: '', phone: '', address: '' })
    setModalOpen(true)
  }

  const openEditModal = (customer: Customer) => {
    setEditCustomer(customer)
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      await customerService.deleteCustomer(id)
      fetchCustomers()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editCustomer) {
      await customerService.updateCustomer(editCustomer._id, form)
    } else {
      await customerService.createCustomer(form)
    }
    setModalOpen(false)
    fetchCustomers()
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-black via-blue-900 to-purple-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />

          {/* Title + Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">👤 Customers</h1>
            <button
              onClick={openAddModal}
              className="bg-purple-600 text-white px-6 py-2 rounded-2xl shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform"
            >
              + Add Customer
            </button>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl shadow-black/50">
            <table className="min-w-full text-white">
              <thead className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="py-3 px-4">{c.name}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">{c.phone}</td>
                    <td className="py-3 px-4">{c.address}</td>
                    
                    
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-xl font-semibold shadow-lg shadow-yellow-400/40 hover:scale-105 transition-transform"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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
                  {editCustomer ? 'Edit Customer' : 'Add Customer'}
                </h2>
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
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/60"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                      {editCustomer ? 'Update' : 'Add'}
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
