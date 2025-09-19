import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await login(email, password) // ✅ fix: pass separately
    router.push('/dashboard')
  } catch {
    setError('Invalid email or password')
  }
}
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg/bg1.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl shadow-black/40 p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">🚀 Login</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-white/20 bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-white/20 bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/40 hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-gray-300 text-center mt-6">
          Don’t have an account?{' '}
          <Link href="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  )
}
