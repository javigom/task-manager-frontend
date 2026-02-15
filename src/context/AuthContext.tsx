import React, { createContext, useContext, useState, useEffect } from 'react'
import { setAccessToken } from '../services/api'

type AuthContextType = {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Read token synchronously from localStorage to avoid a flash redirect
  const initial = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  const [token, setToken] = useState<string | null>(initial)
  
  // Set access token header on mount
  useEffect(() => {
    if (initial) setAccessToken(initial)
  }, [])

  const login = (t: string) => {
    setToken(t)
    setAccessToken(t)
    localStorage.setItem('access_token', t)
  }

  const logout = () => {
    setToken(null)
    setAccessToken(null)
    localStorage.removeItem('access_token')
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
