import React, { createContext, useContext, useState, useEffect } from 'react'
import api, { setAccessToken } from '../services/api'

type AuthContextType = {
  token: string | null
  login: (token: string) => void
  logout: () => void
  checked: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Read token synchronously from localStorage to avoid a flash redirect
  const initial = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  const [token, setToken] = useState<string | null>(initial)
  // checked == whether initial token validation has completed
  const [checked, setChecked] = useState<boolean>(initial ? false : true)

  // Set access token header on mount and validate initial token
  useEffect(() => {
    let mounted = true
    async function validate() {
      if (!initial) {
        if (mounted) setChecked(true)
        return
      }
      setAccessToken(initial)
      try {
        // Lightweight validation: call a protected endpoint.
        // If the token is invalid the backend will respond 401.
        await api.get('/tasks', { params: { limit: 1, skip: 0 } })
        if (mounted) setChecked(true)
        // token valid — nothing else to do
      } catch (e: any) {
        // If unauthorized, clear token to avoid showing logged-in UI
        if (mounted) {
          setToken(null)
          setAccessToken(null)
          localStorage.removeItem('access_token')
          setChecked(true)
        }
      }
    }

    validate()
    return () => {
      mounted = false
    }
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

  return <AuthContext.Provider value={{ token, login, logout, checked }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
