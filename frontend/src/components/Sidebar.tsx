import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="w-64 h-screen p-6 bg-white/10 backdrop-blur-lg border-r border-white/10 shadow-lg shadow-black/40 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">
      {/* Top Logo */}
      <div>
        <h2
          onClick={() => router.push('/')} // <-- Redirect to home page
          className="text-3xl font-extrabold text-white mb-10 cursor-pointer hover:text-purple-300 transition"
        >
          ⚡AutoMatrix 
        </h2>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className={`px-4 py-2 rounded-xl text-left font-medium transition
              ${
                router.pathname === '/dashboard'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                  : 'text-white hover:text-purple-300'
              }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push('/dashboard/cars')}
            className={`px-4 py-2 rounded-xl text-left font-medium transition
              ${
                router.pathname === '/dashboard/cars'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-white hover:text-blue-300'
              }`}
          >
            Cars
          </button>

          <button
            onClick={() => router.push('/dashboard/customers')}
            className={`px-4 py-2 rounded-xl text-left font-medium transition
              ${
                router.pathname === '/dashboard/customers'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/50'
                  : 'text-white hover:text-pink-300'
              }`}
          >
            Customers
          </button>

          <button
            onClick={() => router.push('/dashboard/services')}
            className={`px-4 py-2 rounded-xl text-left font-medium transition
              ${
                router.pathname === '/dashboard/services'
                  ? 'bg-gradient-to-r from-purple-500 to-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'text-white hover:text-green-300'
              }`}
          >
            Services
          </button>
        </nav>
      </div>

      {/* Bottom Logout */}
     
    </aside>
  )
}
