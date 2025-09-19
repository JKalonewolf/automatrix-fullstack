// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {jwtDecode} from 'jwt-decode'

interface ProtectedRouteProps {
  children: ReactNode
}

interface TokenPayload {
  exp: number
  role?: string
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      // 🚨 No token found, redirect
      router.replace('/login')
      setIsAuthenticated(false)
      return
    }

    try {
      // ✅ Decode token to check expiry
      const decoded: TokenPayload = jwtDecode(token)
      const now = Date.now() / 1000

      if (decoded.exp && decoded.exp < now) {
        // 🚨 Token expired
        localStorage.removeItem('token')
        router.replace('/login')
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    } catch (err) {
      // 🚨 Invalid token
      localStorage.removeItem('token')
      router.replace('/login')
      setIsAuthenticated(false)
    }
  }, [router])

  // ⏳ Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        Checking authentication...
      </div>
    )
  }

  // ✅ Only render children if authenticated
  return <>{isAuthenticated && children}</>
}
