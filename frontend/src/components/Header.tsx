import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'

export default function Header() {
  const { logout, user } = useAuth() // get current user
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow rounded-lg mb-6">
      {/* Show logged-in user's name */}
      <h1 className="text-xl font-bold text-gray-800">
        Welcome, {user ? user.name : 'User'}
      </h1>
      
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  )
}
