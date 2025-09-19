import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'  // ✅ Import Link here

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-tr from-black via-blue-900 to-purple-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          <h1 className="text-3xl text-white font-bold mb-6 drop-shadow-lg"></h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/cars"
              className="bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 border border-white/10 rounded-3xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 text-center"
            >
              <h2 className="text-xl font-bold text-white drop-shadow-lg">Cars</h2>
              <p className="text-white/80 mt-2">Manage all cars</p>
            </Link>

            <Link
              href="/dashboard/customers"
              className="bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 border border-white/10 rounded-3xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 text-center"
            >
              <h2 className="text-xl font-bold text-white drop-shadow-lg">Customers</h2>
              <p className="text-white/80 mt-2">Manage all customers</p>
            </Link>

            <Link
              href="/dashboard/services"
              className="bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 border border-white/10 rounded-3xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 text-center"
            >
              <h2 className="text-xl font-bold text-white drop-shadow-lg">Services</h2>
              <p className="text-white/80 mt-2">Manage all services</p>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
