import { createContext, useState, ReactNode, useEffect } from 'react'
import { User } from '@/types'
import * as authService from '@/services/authService'

interface AuthContextProps {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; password: string }) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
  const { user: loggedUser, token } = await authService.login(email, password)
  setUser(loggedUser)
  localStorage.setItem('user', JSON.stringify(loggedUser))
  localStorage.setItem('token', token)
}

const register = async (data: { name: string; email: string; password: string }) => {
  const { user: newUser, token } = await authService.register(data.name, data.email, data.password)
  setUser(newUser)
  localStorage.setItem('user', JSON.stringify(newUser))
  localStorage.setItem('token', token)
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
